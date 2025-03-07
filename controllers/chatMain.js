const chatHelper=require('./chatHelper');

const userLogIn=async(socketId,email)=>{
    try {
        const updatedUser=await chatHelper.setSocketId(email,socketId.id);
        // console.log(`user with ${email} is now connected with socketid `);
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
const sendMessage = async (io, from, to, content) => {
    try {
        await chatHelper.saveMessage(from, to, content);
        const recipient = await chatHelper.findUserbyusername(to);
        if (recipient && recipient.socketId) {
            io.to(recipient.socketId).emit("receiveMessage", { from, content });
            return { success: true, message: "Message sent in real-time" };
        }
        return { success: true, message: "User offline, message stored" };
    } catch (error) {
        console.error("sendMessage error:", error);
        return { success: false, error: "Error sending message, please try again." };
    }
};


module.exports={
    sendMessage,
    userLogIn,
    userLoggedOut
}