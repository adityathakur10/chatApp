const chatHelper=require('./chatHelper');

const userLogIn=async(socketId,email)=>{
    try {
        const updatedUser=await chatHelper.setSocketId(email,socketId.id);
        console.log(`user with ${email} is now connected with socketid `);
    } catch (error) {
        console.log(`error updating socketId`,error);
    }

}
const userLoggedOut=async(socketId)=>{
    try {
        await chatHelper.resetSocketId(socketId);
    } catch (error) {
        console.log('error reseting socket id')
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
    userLogIn,
    userLoggedOut
}