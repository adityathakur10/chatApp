const User=require('../models/user');
const message_model=require('../models/message');
const { getChatHistory } = require('../controllers/chatHelper');
// const { options } = require('../routes/chat');

const searchUser=async(req,res)=>{
    try {
        const {username}=req.body;
    
        const users=await User.find({
            username:{$regex:`^${username}`,$options:'i'}
        }).select('username email')    
        console.log(users)
        if(users.length==0)
            return res.status(400).json({msg:'No user found'})
        return res.status(200).json(users)
    } catch (error) {
        console.error('error searching for users');
        return res.status(500).json({ msg: 'Server error' });
    }
}
const addUser=async(req,res)=>{
    try {
        const {username:name}=req.body;
        const loggedInUser=req.user.name;

         if(name==loggedInUser){
            return res.status(400).json({message:'you cannot add yourself.'})
        }

        const user=await User.findOne({username:loggedInUser});
        console.log('adding ',name)
        if(!user.addedUser.includes(name)){        
            user.addedUser.push(name);
            await user.save();
            res.status(200).json({message:'user added'})
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
        const {username}=req.body;
        console.log(username)
    const loggedInUser=req.user.name;

    if(!username){
        return res.status(400).json({message:' username required '})
    }
    const user=await User.findOne({username:loggedInUser});
        //remove user as a friend
    user.addedUser=user.addedUser.filter(u=>u!=username); //.......rmove user from both arrays
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
        console.log('hi')
        const username=req.user.name;
        const user=await User.findOne({username});
        console.log(user.addedUser)
        res.json(user.addedUser)

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
   
        const messages = await getChatHistory(from, to);
        res.json(messages);
    } catch (error) {
        console.log('error fetching messages:- ',error);
        res.status(500).json({ error:'internal sever error'});
    }
}

module.exports={searchUser,fetchMessages,addUser,removeUser,fetchAddedUser}