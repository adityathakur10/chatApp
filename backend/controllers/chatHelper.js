const User=require('../models/user');
const Message=require('../models/message');
const { encrypt, decrypt } = require('../utils/crypto');

const setSocketId=async(email,socketId)=>{
    // console.log(username+"hellooooo")
    try {        
        return await User.findOneAndUpdate({email},{socketId},{new:true});
    } catch (error) {
        console.log('erro in update socketid ')
    }
}
const resetSocketId=async(socketId)=>{
    try {
        
        return await User.findOneAndUpdate({socketId:socketId},{socketId:null},{new:true})
    } catch (error) {
        console.log('error while reseting sockeid')
    }
}
const saveMessage = async (from, to, content) => {
    // Encrypt the content before creating the message.
    const encryptedContent = encrypt(content);
    // console.log(encryptedContent)
    const newMsg = new Message({ from, to, content: encryptedContent });
    return await newMsg.save();
};
const getChatHistory = async(user_A, user_B) => {
    const messages = await Message.find({
        $or: [
            { from: user_A, to: user_B },
            { from: user_B, to: user_A }
        ]
    }).sort({ timestamp: 1 });

    // Decrypt each message content before returning.
    return messages.map(msg => ({
        ...msg.toObject(),
        content: decrypt(msg.content)
    }));
};
const findUserbyusername=async(username)=>{
//  console.log(`hellooooo ${username}`)
    return await User.findOne({username})
}

module.exports={
    setSocketId,
    resetSocketId,
    saveMessage,
    getChatHistory,
    findUserbyusername
}