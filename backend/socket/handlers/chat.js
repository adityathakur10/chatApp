import { getOrCreateConversation,ensureSocketRoom,appendMessage } from "../../services/chatService";

export const chatHadler=(io,socket)=>{
    const userId=socket.data.user.id;

    socket.on('chat:open',async({recipientId},ack)=>{
        try {
            if(!recipientId || String(recipientId)===String(userId))
                return ack?.({ok:false,error:"Invalid recipient ID"});

            const conv=await getOrCreateConversation(userId,recipientId);
            const conversationId=String(conv._id);

            socket.join(`conv:${conversationId}`);
            ensureSocketRoom(io,conversationId,conv.participants);

            return ack?.({ok:true,conversationId});
        } catch (error) {
            return ack?.({ok:false,error:'Failed to open conversation'});
        }
    })

    socket.on('message:send', async ({ conversationId, content }, ack) => {
        try {
            if (!conversationId || !content?.trim()) {
                return ack?.({ ok: false, error: 'Invalid payload' });
            }
            const msg = await appendMessage({
                conversationId,
                senderId: userId,
                content,
            });

            io.to(`conv:${conversationId}`).emit('message:new', msg);
            return ack?.({ ok: true, message: msg });
        } catch (e) {
            return ack?.({ ok: false, error: e.message || 'Send failed' });
        }
    });

}