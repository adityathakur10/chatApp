const chatController=require('../controllers/chatMain');

const chatHandeler=async(io)=>{
    io.on('connection',(socket)=>{
        console.log('user connected',socket.id);

        socket.on('userLoggedIn',(email)=>{
            chatController.userLogIn(socket,email);
        })
        socket.on('sendMessage',(data)=>{
            chatController.sendMessage(io,data);
            console.log('ddddddddddddddddddddddd')
        })
        socket.on('disconnect',async()=>{
            await chatController.userLoggedOut(socket.id);
            console.log(`user disconnecttttted `,socket.id);
        })
    })
}

module.exports=chatHandeler