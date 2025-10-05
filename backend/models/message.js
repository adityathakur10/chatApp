const mongoose=require('mongoose')

    const msgSchema=new mongoose.Schema({
        sender:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user',
            required:true,
        },
        conversation:{
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