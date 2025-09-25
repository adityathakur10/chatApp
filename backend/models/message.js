const mongoose=require('mongoose')

const msgSchema=new mongoose.Schema({
    to:{
        type:String,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    content:{
        type :String,
        required:true,
    },
    timestamp:{
        type:Date,
        default:Date.now,
    }
})

module.exports=mongoose.model('Message',msgSchema)