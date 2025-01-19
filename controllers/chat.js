const User=require('../models/user');


const addUser=async(req,res)=>{
    const {username}=req.body;
    
    const user=await User.findOne({username:username});
    if(!user)
        return res.status(400).json({msg:'user not found'})
    return res.status(200).json({username:user.username,email:user.email})
}

module.exports=addUser