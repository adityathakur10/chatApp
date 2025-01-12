const mongoose=require('mongoose')

const groupSchema=new mongoose.Schema({
    name:String,
    members:[String],
    from:String,
    content:String
})

module.exports=mongoose.model('Group',groupSchema)