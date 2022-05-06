const express = require('express')
//const checkAuth=require('..')
const userControllers=require('../controllers/users.controller')

const router=express.Router()

const multer=require('multer');
const upload=multer({dest:'uploads/'});


router.post('/signup',userControllers.userRegister);
router.post('/login',userControllers.userLogin);
router.get('/getme/:userid',userControllers.getUser);
router.get('/getuser/:userid',userControllers.getUser);
router.post('/upgradeUser',userControllers.UpgradeUser);
module.exports = router