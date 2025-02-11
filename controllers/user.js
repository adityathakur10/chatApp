const User=require('../models/user');
const message_model=require('../models/message')

const searchUser=async(req,res)=>{
    const {username}=req.body;
    
    // if(username==req.user.name){
    //     return res.status(400).json({msg:'user not found'})
    // }
    const user=await User.findOne({username:username});
    
    if(!user)
        return res.status(400).json({msg:'user not found'})
    return res.status(200).json({username:user.username,email:user.email})
}
const addUser=async(req,res)=>{
    try {
        const {username}=req.body;
        const loggedInUser=req.user.name;

    if(username==loggedInUser){
        return res.status(400).json({msg:'you cannot add yourself.'})
    }

    const user=await User.findOne({username:loggedInUser});
    if(!user.addedUser.includes(username)){
        user.addedUser.push(username);
        await user.save();
    }else{
        return res.status(409).json({message:'user already added '})
    }
    } catch (error) {
        console.log('error adding user :- ',error)
        res.status(500).json({error : 'internal server error '})
    }
}
const removeUser=async(req,res)=>{
    try {
        const username=req.body;
    const loggedInUser=req.user.name;

    if(!username){
        return res.status(400).json({message:' username required '})
    }
    const user=await User.findOne({username:loggedInUser});
        //remove user as a friend
    user.addedUser=user.addedUser.filter(u=>u!=username);
    await user.save();
        //delete chat history
    await message_model.deleteMany({
        $or:[{from:loggedInUser,to:username},{from:username,to:loggedInUser}]
    });

    res.status(200).json({message:" user removed and chat history deleted "})
    } catch (error) {
        console.log('error removing user');
        res.status(500).json({error:"internal server error"})
    }

}
const fetchAddedUser=async(req,res)=>{
    try {
        const username=req.user.name;

        const user=await User.findOne({username});
        res.json({addedUsers:user.addedUser})

    } catch (error) {
        console.log("error fetching added users!!!");
        res.status(500).json({error:"internal server error."})
    }
}

const fetchMessages=async(req,res)=>{
    try {
        const {to}=req.body;
        const from=req.user.name;
         
        if(!to){
            return res.status(400).json({error:"receipient username is required"});
        }
   
        const messages=await message_model.find({
            $or:[{from,to},{from:to,to:from}]
        }).sort({createdAt:1});
        
        res.json(messages);
    } catch (error) {
        console.log('error fetching messages:- ',error);
        res.status(500).json({ error:'internal sever error'});
    }
}

module.exports={searchUser,fetchMessages,addUser,removeUser,fetchAddedUser}