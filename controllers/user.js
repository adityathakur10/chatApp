const User=require('../models/user');
const message_model=require('../models/message')

const addUser=async(req,res)=>{
    const {username}=req.body;
    // console.log(username)
    const user=await User.findOne({username:username});
    // console.log("bhnjm")
    if(!user)
        return res.status(400).json({msg:'user not found'})
    return res.status(200).json({username:user.username,email:user.email})
}

const fetchMessages=async(req,res)=>{
    try {
        const {to}=req.body;
        const from=req.user.name;
         
        if(!to){
            return res.status(400).json({error:"receipient username is required"});
        }
console.log(from)
console.log(to)
        const messages=await message_model.find({
            $or:[{from,to},{from:to,to:from}]
        }).sort({createdAt:1});
        console.log('dcffffffffffffffffffffffffffffffffffff')
        console.log(messages)
        res.json(messages);
    } catch (error) {
        console.log('error fetching messages:- ',error);
        res.status(500).json({ error:'internal sever error'});
    }
}

module.exports={addUser,fetchMessages}