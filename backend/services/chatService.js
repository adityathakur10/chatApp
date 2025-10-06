const mongoose = require('mongoose');
const Conversation = require('../models/conversation');
const Message = require('../models/message');
const { getSockets } = require('../socket/store');

const toObjectId = (id) => (typeof id === 'string' ? new mongoose.Types.ObjectId(id) : id);

const serializeMsg = (msgDoc) => ({
  _id: String(msgDoc._id),
  conversationId: String(msgDoc.conversation),
  from: String(msgDoc.sender),
  content: msgDoc.content,
  timestamp: msgDoc.createdAt?.toISOString?.() || new Date().toISOString(),
});

async function getOrCreateConversation(userIdA, userIdB) {
  const a = toObjectId(userIdA);
  const b = toObjectId(userIdB);
  if (!a || !b) throw new Error('Both user IDs must be provided');

  let conversationDoc = await Conversation.findOne({
    participants: { $all: [a, b], $size: 2 },
  }).lean();

  if (!conversationDoc) {
    const created = await Conversation.create({ participants: [a, b], messages: [] });
    conversationDoc = created.toObject();
  }

  return conversationDoc;
}

function ensureSocketRoomForParticipants(io, conversationId, participantIds) {
  const room = `conv:${conversationId}`;
  for (const pid of participantIds) {
    const sockets = getSockets(String(pid));
    for (const sid of sockets) {
      const s = io.sockets.sockets.get(sid);
      if (s) s.join(room);
    }
  }
}

async function appendMessage({ conversationId, senderId, content }) {
  if (!content || !content.trim()) throw new Error('Message content cannot be empty');

  const conv = await Conversation.findById(conversationId).select('participants').lean();
  if (!conv) throw new Error('Conversation not found');

  const isMember = conv.participants.map((p) => String(p)).includes(String(senderId));
  if (!isMember) throw new Error('Sender is not a participant of the conversation');

  const msg = await Message.create({
    sender: toObjectId(senderId),
    conversation: toObjectId(conversationId),
    content: content.trim(),
  });

  await Conversation.findByIdAndUpdate(conversationId, {
    $push: { messages: msg._id },
    $set: { updatedAt: new Date() },
  });

  return serializeMsg(msg);
}

async function getMessages(conversationId, { before, limit = 50 } = {}) {
  const filter = { conversation: toObjectId(conversationId) };
  if (before) {
    const beforeDate = new Date(before);
    if (!isNaN(beforeDate)) filter.createdAt = { $lt: beforeDate };
  }

  const docs = await Message.find(filter).sort({ createdAt: 1 }).limit(limit).lean();
  return docs.map(serializeMsg);
}

module.exports = {
  getOrCreateConversation,
  ensureSocketRoomForParticipants,
  appendMessage,
  getMessages,
};
