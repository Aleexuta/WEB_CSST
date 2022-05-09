const express = require('express')
//const checkAuth=require('..')
const articleControllers=require('../controllers/article.controller')
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
router.post('/add',upload.single('myimg'),articleControllers.AddArticle);

module.exports = router