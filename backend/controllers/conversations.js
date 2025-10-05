import { getOrCreateConversation, sendMessage } from "../services/chatService.js";
import conversation from "../models/conversation.js";
import user from "../models/user.js"
import message from "../models/message.js";

const toId = (id) => (typeof id === 'string' ? new mongoose.Types.ObjectId(id) : id);


export const openConv=async(req,res)=>{
    const userId=req.user.userId;
    const targetUserId=req.body;

    if(!targetUserId || targetUserId===userId){
        return res.status(400).json({message:"Invalid target user ID"});
    }

    try {
        const convDoc=getOrCreateConversation(userId,targetUserId);

        return res.status(200).json({conversationId:convDoc._id});
    } catch (error) {
        console.log("Error in openConversation");
        return res.status(500).json({message:"Server error"});
    }


}

export const listConv=async(req,res)=>{
    try {
        const userId=req.user.userId;
        const convs=await conversation.find({participants:userId})
            .select('participants updatedAt')
            .sort({updatedAt:-1})
            .lean();
        
        const results=[];
        for(const c of convs){
            const others=c.participants.map(String).filter((p)=>p!==String(userId));
            const other=await user.findById(others[0]).select('_id username profilePicture').lean();
            const last=await message.findOne({conversation:c._id}).sort({createdAt:-1}).lean();

            results.push({
                _id:String(c._id),
                otherUser:other ? {_id:String(other._id),username:other.username,profilePicture:other.profilePicture || ''} : null,
                lastMessage:last ? {content:last.content,timestamp:last.createdAt?.toISOString?.()} : null ,
                updatedAt:c.updatedAt?.toISOString?.()

            })
        }
        return res.status(500).json(results)

    } catch (error) {
        console.error('listMine error', e);
        return res.status(500).json({ message: 'Server error' });
    }
}

export const getMessages=async(req,res)=>{
    try {
        const me = req.user.userId;
        const { id } = req.params;
        const { before, limit = 50 } = req.query;

        const conv = await conversation.findById(id).select('participants').lean();
        if (!conv) return res.status(404).json({ message: 'Conversation not found' });

        const isMember = conv.participants.map(String).includes(String(me));
        if (!isMember) return res.status(403).json({ message: 'Forbidden' });

        const filter = { Conversation: toId(id) };
        if (before) {
            const b = new Date(before);
            if (!isNaN(b)) filter.createdAt = { $lt: b };
        }

        const docs = await message.find(filter).sort({ createdAt: 1 }).limit(Number(limit)).lean();
        return res.json(docs.map(serializeMsg));
    } catch (e) {
            console.error('getMessages error', e);
            return res.status(500).json({ message: 'Server error' });
    }
}