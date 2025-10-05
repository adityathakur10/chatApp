const express=require('express')
const router=express.Router();

const authenticate=require('../middlewares/auth')

const authRouter=require('./auth')
const chatRouter=require('./chat')
const conversationRouter=require('./conversations')

router.use('/auth',authRouter);
router.use('/chat',authenticate,chatRouter);
router.use('/conv',authenticate,conversationRouter);

module.exports=router;