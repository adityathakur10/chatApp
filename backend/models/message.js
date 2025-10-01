    const mongoose=require('mongoose')
const Conversation = require('./Conversation')

    const msgSchema=new mongoose.Schema({
        sender:{
            type:mongoose.Schema.types.ObjectId,
            ref:'user',
            required:true,
        },
        Conversation:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'conversation',
            required:true
        },
        content:{
            type :String,
            required:true,
        }
    },{timestamps:true})

module.exports=mongoose.model('message',msgSchema)