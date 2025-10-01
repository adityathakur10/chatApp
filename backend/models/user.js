const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'plz provide email'],
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    profilePicture:{
        type:String,
        default:''
    },
    conversations:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'conversation'
    }]
},{timestamps:true});

userSchema.pre('save',async function(next){
    // console.log(this.password)
    if(!this.isModified('password'))return next();
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)
    next()
})
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.createJWT=function(){
    return jwt.sign({
        userId:this._id,
        name:this.username
    },process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}

module.exports=mongoose.model('user',userSchema)