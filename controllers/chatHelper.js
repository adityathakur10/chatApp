const User=require('../models/user');
const Message=require('../models/message');

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
const saveMessage=async(from,to,content)=>{
    const newMsg=new Message({from ,to,content});
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