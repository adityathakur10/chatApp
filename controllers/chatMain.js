const chatHelper=require('./chatHelper');

const userLogIn=async(socketId,username)=>{
    try {
        const updatedUser=await chatHelper.updateSocketId(username,socketId.id);
        console.log(`${username} is now connected with socketid `);
    } catch (error) {
        console.log(`error updating socketId`,error);
    }

}

const sendMessage=async(io,{from,to,message})=>{
    try {
        await chatHelper.saveMessage(from,to,message);
        const recepient=await chatHelper.findUserbyusername(to);
        if(recepient && recepient.socketId){
            io.to(recepient.socketId).emit('recieveMessage',{from,message});
        }
    } catch (error) {
        console.error(`error sending message`,error);
    }
}

module.exports={
    sendMessage,
    userLogIn
}