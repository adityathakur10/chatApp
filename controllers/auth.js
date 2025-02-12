const user=require('../models/user')

const register=async(req,res)=>{
    const {username,email,password}=req.body
    // console.log(username)
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
    try {
        const exist=await user.findOne({email})
        if(exist){
            return res.status(400).json({message:"this email already exist"})
        }
        // const user=await user.create({...req.body})
        const newUser=new user({username,email,password})
        await newUser.save()

        return res.status(201).json({message:"new user created"})
    } catch (error) {
        console.log(error)
        if(error.code==11000){
            return res.status(500).json({message:"user already exist"})

        }
        return res.status(500).json({message:"error creating user"})
    }
}

const login=async(req,res)=>{
    const {email,password}=req.body;
    
    try {
        const existingUser=await user.findOne({email})
        const passwordCheck=await existingUser.comparePassword(password)
        console.log(password)
        console.log(passwordCheck)
        if(!existingUser || !passwordCheck){
            return res.status(404).json({message:"invalid credentials"})
        }
        
        const token=existingUser.createJWT()

        res.cookie('token',token,{
            // httpOnly:true,
            httpOnly:false,
            secure:process.env.NODE_ENV='production',
            sameSite:'Strict',
            maxAge:3600000
        })
        res.status(200).json({ message: "Login successful"});

    } catch (error) {
        console.log(error)
         res.status(500).json({message:"error logging in"})
    }
}

module.exports={login,register}