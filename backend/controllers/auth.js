const user=require('../models/user')

const register=async(req,res)=>{
    // console.log("hello");
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
        const newUser=new user({username,email,password})
        await newUser.save()
        const token=newUser.createJWT();

        return res.status(201).json({
            message:"new user created and logged in ", 
            username:newUser.username,
            token:token,
            _id:newUser._id
        })
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
    // console.log('hello')
    try {
        const existingUser=await user.findOne({email})
        if (!existingUser) {
            return res.status(404).json({ message: "Invalid credentials" });
        }
        
        const passwordCheck=await existingUser.comparePassword(password)
        if(!passwordCheck){
            return res.status(404).json({message:"invalid credentials"})
        }
        
        const token=existingUser.createJWT()

        // res.cookie('token',token,{
        //     // httpOnly:true,
        //     httpOnly:false,
        //     secure:process.env.NODE_ENV='production',
        //     sameSite:'Strict',
        //     maxAge:3600000
        // })
        res.status(200).json({
            message: "Login successful",
            username: existingUser.username,
            token: token,
            _id: existingUser._id
        });

    } catch (error) {
        console.log(error.message)
         res.status(500).json({message:"error logging in"})
    }
}

module.exports={login,register}