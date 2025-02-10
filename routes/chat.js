const express=require('express')
const router=express.Router()
const {addUser,fetchMessages}=require('../controllers/user')


router.post('/addUser',addUser)
router.post('/fetchMessages',fetchMessages)

module.exports=router