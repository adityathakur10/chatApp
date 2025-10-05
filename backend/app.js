const express=require('express')
const {createServer}=require('http')

const cookies=require('cookie-parser')
const cors=require('cors')
const path=require('path')
require('dotenv').config();


const connectDB=require('./db/connect')
const router=require('./routes/index')

const setupSocket=require('./socket/index')

//wrap express app with http server for websockets
const app=express();
const server=createServer(app);

const corsOptions={
    origin:'http://localhost:5173',
    credentials:true
}
//adding JWT auth to socket.io connections
const io=setupSocket(server,corsOptions)


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
app.use('/',router)



const port=3000;
const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI)

        server.listen(port,()=>{
            console.log(`database connected and listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()