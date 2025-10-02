const jwt =require('jsonwebtoken');
//token should be renewd after it is expired

const authenticate=async(req,res,next)=>{
    const authHeader=req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith('Bearer '))
        return res.status(401).json({message:'authentication failed. No token provided'})
    
    const token=authHeader.split(' ')[1];
    // console.log(token)
    if(!token)
        return res.status(401).json({message:'authentication failed. No token provided'})

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        // console.log('auth ended')
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({message:'authentication failed.Invalid token'})
    }
}
module.exports=authenticate