const bcrypt = require("bcrypt");
require("../node_modules/dotenv").config();
const Article=require("../Models/article");
const mongoose=require('mongoose');
const path=require('path');
var fs = require('fs-extra');
var fs=require('fs-extra');
var formidable=require("formidable");
const multer = require("multer")

var storage=multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,'./uploads')
    },
    filename:function(req,file,cb){
      cb(null,file.originalname)
    }
  });
  var upload =multer({storage:storage});
  
  
const AddArticle=(req,res,next)=>{
    console.log("sunt in add article");
    console.log(JSON.stringify(req.body));
    console.log(JSON.stringify(req.file));
    const article=new Article({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        link:req.body.link,
        imgUrl:req.file.path.replace("\\","/"),
    });
    article.save()
          .then(async(result)=> {
            await result
                .save()
                .then((result1)=>{
                    console.log('Article created '+ result._id)
                    res.status(201).json({
                        message:"articol creat"
                    }) 
                })
                .catch((err)=>{
                    console.log(400).json({
                        message:err.toString()
                    })
                });
          })
          .catch((err)=>{
              console.log(err)
              res.status(500).json({
                  message:err.toString()
              })
          });
}

module.exports = {
    AddArticle,
 };