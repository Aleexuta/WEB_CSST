const express = require('express')
//const checkAuth=require('..')
const userControllers=require('../controllers/users.controller')
const multer = require("multer")
const router=express.Router()

var storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./uploads')
  },
  filename:function(req,file,cb){
    cb(null,file.originalname)
  }
});
var upload =multer({storage:storage});



router.post('/signup',userControllers.userRegister);
router.post('/login',userControllers.userLogin);
router.get('/getme/:userid',userControllers.getUser);
router.get('/getuser/:userid',userControllers.getUser);
router.post('/upgradeUser',upload.single('myimg'),userControllers.UpgradeUser);
router.get('/registerCourse/:userid/:courseid',userControllers.RegisterCourse);
router.get('/removeCourse/:userid/:courseid',userControllers.RemoveCourse);
router.post('/changePass',userControllers.ChangePass);
module.exports = router