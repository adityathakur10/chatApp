const express=require('express')
const path = require('path');
const router=express.Router()

const {login,register}=require('../controllers/auth')

// Serve signup and login pages
router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'signup.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

router.post('/signup',register)
router.post('/login',login)


module.exports=router