const chatController=require('../controllers/chatMain');
const jwt = require('jsonwebtoken');

const chatHandeler=async(io)=>{
    io.on('connection',(socket)=>{
      
        // console.log('user connected',socket.id);

        socket.on('userLoggedIn',(email)=>{
            chatController.userLogIn(socket,email);
        })
        socket.on('sendMessage',(data)=>{
            try {
                const token = socket.handshake.query.token; 
            if (!token) {
              return socket.emit('error', { message: 'No token provided' });
            }
            // console.log('JWT Token:', token);
    
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //   console.log(`Userchaaattttttt ${decoded.username} connected`);
            chatController.sendMessage(io,decoded.name,data.to,data.message);
            // console.log('ddddddddddddddddddddddd')
            } catch (error) {
                console.log('error in sendmessage')
            }
        })
        socket.on('disconnect',async()=>{
            await chatController.userLoggedOut(socket.id);
            console.log(`user disconnecttttted `,socket.id);
        })
    })
}

module.exports=chatHandeler