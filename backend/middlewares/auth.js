const jwt =require('jsonwebtoken');

const authenticate=async(req,res,next)=>{
    const token=req.cookies.token;
    if(!token)
        return res.status(401).json({message:'authentication failed. No token provided'})
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        console.log(decoded)
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({message:'authentication failed.Invalid token'})
    }
}
module.exports=authenticate