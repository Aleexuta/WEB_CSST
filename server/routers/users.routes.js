const express = require('express')
//const checkAuth=require('..')
const userControllers=require('../controllers/users.controller')
const router=express.Router()

router.post('/signup',userControllers.userRegister);


module.exports = router