const express=require('express')
const path = require('path');
const router=express.Router()

const {login,register}=require('../controllers/auth')

router.post('/signup',register)
router.post('/login',login)


module.exports=router