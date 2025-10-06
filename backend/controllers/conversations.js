const mongoose = require('mongoose');
const Conversation = require('../models/conversation');
const User = require('../models/user');
const Message = require('../models/message');
const { getOrCreateConversation, getMessages: getMsgs } = require('../services/chatService');

const toId = (id) => (typeof id === 'string' ? new mongoose.Types.ObjectId(id) : id);

async function openConv(req, res) {
  const userId = req.user.userId;
  const { recipientId } = req.body || {};
  if (!recipientId || String(recipientId) === String(userId)) {
    return res.status(400).json({ message: 'Invalid target user ID' });
  }

  try {
    const convDoc = await getOrCreateConversation(userId, recipientId);
    return res.status(200).json({ conversationId: String(convDoc._id) });
  } catch (error) {
    console.log('Error in openConversation', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function listConv(req, res) {
  try {
    const userId = req.user.userId;
    const convs = await Conversation.find({ participants: toId(userId) })
      .select('participants updatedAt')
      .sort({ updatedAt: -1 })
      .lean();

    const results = [];
    for (const c of convs) {
      const others = c.participants.map(String).filter((p) => p !== String(userId));
      const other = await User.findById(others[0]).select('_id username profilePicture').lean();
      const last = await Message.findOne({ conversation: c._id }).sort({ createdAt: -1 }).lean();

      results.push({
        _id: String(c._id),
        otherUser: other
          ? { _id: String(other._id), username: other.username, profilePicture: other.profilePicture || '' }
          : null,
        lastMessage: last
          ? { content: last.content, timestamp: last.createdAt?.toISOString?.() }
          : null,
        updatedAt: c.updatedAt?.toISOString?.(),
      });
    }
    return res.json(results);
  } catch (error) {
    console.error('listConv error', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function getMessages(req, res) {
  try {
    const me = req.user.userId;
    const { id } = req.params;
    const { before, limit = 50 } = req.query;

    const conv = await Conversation.findById(id).select('participants').lean();
    if (!conv) return res.status(404).json({ message: 'Conversation not found' });

    const isMember = conv.participants.map(String).includes(String(me));
    if (!isMember) return res.status(403).json({ message: 'Forbidden' });

    const docs = await getMsgs(id, { before, limit });
    return res.json(docs);
  } catch (e) {
    console.error('getMessages error', e);
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { openConv, listConv, getMessages };
