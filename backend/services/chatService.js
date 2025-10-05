import conversation from '../models/conversation.js';
import message from '../models/message.js';
import {getSockets} from '../socket/store.js';


const toObjectId=(id)=>{
    return  typeof(id)===String? mongoose.types.toObjectId(id):id;
}
const serializeMsg=(msgDoc)=>({
    _id:String(msgDoc._id),
    conversationId:String(msgDoc.conversation),
    from:String(msgDoc.sender),
    content:msgDoc.content,
    timestamp: msgDoc.createdAt?.toISOString?.() || new Date().toISOString()
})


export const getOrCreateConversation=async(userIdA,userIdB)=>{
    const a=toObjectId(userIdA);
    const b=toObjectId(userIdB);
    try {
        if(!a || !b)
            throw new Error("Both user IDs must be provided");
        
        let conversationDoc=await conversation.findOne({
            participants:{
                $all:[a,b],
                $size:2
            }
        }).lean();
        if(!conversationDoc){
            conversationDoc=new conversation({
                participants:[a,b],
                messages:[]
            })
            await conversationDoc.save();
        }

        return conversationDoc;
        
    } catch (error) {
        return 
    }

}

export const ensureSocketRoom=async(io,conversationId,participantIds)=>{
    const room=`conv:${conversationId}`;
    for(const pid of participantIds){
        const sockets=getSockets(pid);
        for(const sid of sockets){
            const s=io.sockets.sockets.get(sid);
            if(s)s.join(room);
        }
    }
}

export const appendMessage=async({conversationId,senderId,content})=>{
    if(!content || !content.trim())
        throw new Error("Message content cannot be empty");

    const conv=await conversation.findById(conversationId)
        .select('participants')
        .lean();
    
    if(!conv)throw new error("Conversation not found");

    const isMember=conv.participants
        .map((p)=>String(p))
        .include(String(senderId));
    
        if(!isMember) throw new Error("Sender is not a participant of the conversation");

        const msg=await message.create({
            sender:toObjectId(senderId),
            conversation:toObjectId(conversationId),
            content:content.trim()
        });

    await conversation.findByIdAndUpdate(conversationId,{
        $push:{messages:msg._id},
    })
 
    return serializeMsg(msg);

}

export const getMessages=async(conversationId,{before,limit=50}={})=>{
    const filter={conversation:toObjectId(conversationId)};

    if(before){
        const beforeDate=new Date(before);
        if(!isNaN(beforeDate))filter.createdAt={$lt: beforeDate };
    }

    const docs=await message.find(filter)
        .sort({createdAt:1})
        .limit(limit)
        .lean();

    return docs.map(serializeMsg);
}
