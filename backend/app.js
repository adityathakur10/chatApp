const express=require('express')
const {createServer}=require('http')
const path=require('path')
const {Server}=require('socket.io')
const cookies=require('cookie-parser')
const cors=require('cors')
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

const corsOptions={
    origin:'http://localhost:5173',
    credentials:true
}
const io=new Server(server,{
    connectionStateRecovery:{},
    cors:corsOptions
});


//middleware
app.use(cors(corsOptions))
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
app.use('/auth',authRoutes)
app.use('/users',authenticate,chatRoutes)

// webSockets
chatSocketHandeler(io)



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