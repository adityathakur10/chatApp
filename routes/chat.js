const express=require('express')
const router=express.Router()
const addUser=require('../controllers/chat')


router.post('/addUser',addUser)

module.exports=router