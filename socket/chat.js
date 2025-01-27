const chatController=require('../controllers/chatMain');

const chatHandeler=async(io)=>{
    io.on('connection',(socket)=>{
        console.log('user connected',socket.id);

        socket.on('userLoggenIn',(username)=>{
            chatController.userLogIn(socket,username);
        })
        socket.on('sendMessage',(data)=>{
            chatController.sendMessage(io,data);
        })
        socket.on('disconnect',async()=>{
            console.log(`user disconnected `,socket.id);
        })
    })
}

module.exports=chatHandeler