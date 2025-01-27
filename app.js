const express=require('express')
const {createServer}=require('http')
const path=require('path')
const {Server}=require('socket.io')
const cookies=require('cookie-parser')
require('dotenv').config();

const User=require('./models/user')

const connectDB=require('./db/connect')
const authRoutes=require('./routes/auth')
const chatRoutes=require('./routes/chat')
const authenticate=require('./middlewares/auth')
const chatSocketHandeler=require('./socket/chat')

//binding socket.io with the server
const app=express();
const server=createServer(app);
const io=new Server(server,{
    connectionStateRecovery:{}
});

//middleware
app.use(cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

//passing io instance to all the routes
app.use((req,res,next)=>{
    req.io=io;
    next();
})

//routes
app.use('/chatApp/auth',authRoutes)
app.use('/chatApp/chat',authenticate,chatRoutes)

// webSockets
chatSocketHandeler(io)
// io.on('connection',(socket)=>{
//     console.log('user connected: ',socket.id)

//     socket.on('userLoggedIn',async(email)=>{
//         try {
//             const user=await User.findOneAndUpdate(
//                 {email},
//                 {socketId:socket.id},
//                 {new:true}
//             );
//             console.log(`${email} is now connected with socketId ${socket.id}`)
//         } catch (error) {
//             console.log('error updating socketId:- ',error)
//         }
//     })

//     socket.on('disconnect',async()=>{
//         await User.findOneAndUpdate(
//             {socketId:socket.id},
//             {socketId:null},
//             {new:true}
//         )
//         console.log('user disconnected:- ',socket.id)
//     })
// })


const port=3000;
const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI)

        server.listen(3000,()=>{
            console.log(`database connected and listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()