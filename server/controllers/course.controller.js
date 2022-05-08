const bcrypt = require("bcrypt");
require("../node_modules/dotenv").config();
const Course=require("../Models/courses");
const mongoose=require('mongoose');
const path=require('path');
var fs = require('fs-extra');
var fs=require('fs-extra');
var formidable=require("formidable");

const multer = require('multer');
var storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./uploads')
  },
  filename:function(req,file,cb){
    cb(null,file.originalname)
  }
});
var upload =multer({storage:storage});

  

const AddCourse=(req,res,next)=>{
    console.log("sunt in add course");
    console.log(JSON.stringify(req.body));
    console.log(JSON.stringify(req.file));
    const course=new Course({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        instructor:req.body.instructor,
        imgUrl:req.file.path.replace("\\","/"),
        date:[ {
              ziua:req.body.day[0],
              oraInceput:req.body.time[0],  
            },
            {
              ziua:req.body.day[1],
              oraInceput:req.body.time[1],  
            },
            {
              ziua:req.body.day[2],
              oraInceput:req.body.time[2],  
            }
          ]
    });
    course.save()
          .then(async(result)=> {
            await result
                .save()
                .then((result1)=>{
                    console.log('Course created '+ result._id)
                    res.status(201).json({
                        message:"user creat"
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
   AddCourse,
};