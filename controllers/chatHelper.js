const User=require('../models/user');
const Message=require('../models/message');

const updateSocketId=async(username,socketId)=>{
    return await User.findOneAndUpdate({username},{socketId},{new:true});
}
const saveMessage=async(from,to,message)=>{
    const newMsg=new Message({from ,to,message});
    return await newMsg.save();
}
const getChatHistory=async(user_A,user_B)=>{
    return await Message.find({
        $or:[
            {from:user_A,to:user_B},
            {from:user_B,to:user_A},
        ]
    }).sort({timestamp:1})
}
const findUserbyusername=async(username)=>{
    return await User.findOne({username})
}

module.exports={
    updateSocketId,
    saveMessage,
    getChatHistory,
    findUserbyusername
}