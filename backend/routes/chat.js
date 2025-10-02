const express=require('express')
const router=express.Router()
const {searchUser,fetchMessages,fetchAddedUser,addUser,removeUser}=require('../controllers/user')


router.post('/addUser',addUser)
router.post('/fetchMessages',fetchMessages)
router.post('/fetchAddedUsers',fetchAddedUser)
router.delete('/removeUser',removeUser)
router.get('/search/:query',searchUser)

module.exports=router