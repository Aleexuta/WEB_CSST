const bcrypt = require("bcrypt");
require("../node_modules/dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const mongoose=require('mongoose');
const date = require('date-and-time');
const path=require('path');
var fs = require('fs-extra');
var fs=require('fs-extra');
var formidable=require("formidable");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });



const userRegister=(req,res,next) => {
    User.find({$or :[{email:req.body.email},{username:req.body.username}]})
        .exec()
        .then((user)=> {
            if(user.length>=1){
                res.status(409).json({
                    message:"Email or username exists"
                })
            } else {
                if(req.body.psw!=req.body.pswr){
                    res.status(420).json({
                        message:"Password are not the same"
                    })
                } else {
                    const user=new User({
                        _id: new mongoose.Types.ObjectId(),
                        firstname:req.body.firstname,
                        lastname:req.body.lastname,
                        birthday:req.body.birthday,
                        username:req.body.username,
                        email:req.body.email,
                        password:req.body.psw,
                        role:1,
                        courses:[],
                        grad:"",
                        description:"",
                        imgUrl:"",
                        admin:false,
                    });
                    user.save()
                        .then(async(result)=> {
                            await result
                                .save()
                                .then((result1)=>{
                                    console.log('User created '+ result._id)
                                    res.status(201).json({
                                        userDetails:{
                                            userId:result._id
                                        }
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
            }
            
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json({
                message:err.toString()
            })
        });
    
}


const userLogin=(req,res,next) => {
    User.find({$and :[{password:req.body.password},{username:req.body.username}]})
        .exec()
        .then((user)=> {
            if(user.length<1){
                res.status(410).json({
                    message:"Username or password are not correct"
                })
            } else {
                console.log(user[0]);
                res.status(202).json({
                    userDetails:{
                        userId:user[0]._id,
                        role:user[0].role
                    }
                }) 
            }
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json({
                message:err.toString()
            })
        });
    
}

const getUser=(req,res,next) => {
    User.find({_id:req.params.userid})
        .exec()
        .then((user)=> {
            if(user.length<1){
                res.status(410).json({
                    message:"Something went wrong, this account don't exist"
                })
            } else {
                console.log(user[0].firstname);
                var bir=user[0].birthday;

                var data={ 
                    userDetails:{
                        userId:user[0]._id,
                        firstname:user[0].firstname,
                        lastname:user[0].lastname,
                        username:user[0].username,
                        birthday:date.format(bir,'DD/MM/YYYY'),
                        email:user[0].email,
                        courses:user[0].courses,
                    }
                }
                //app.set('views', __dirname + '../views');
                res.render('profil',{data:data});
            }
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json({
                message:err.toString()
            })
        });
    
}

const UpgradeUser=(req,res,next)=>{
    //update la instructor. primesc id ul si datele alea in plus
    console.log("sunt in upgrade");
    //var parser=JSON.parse(req.body);
    console.log(req.body);
    User.find({_id:req.body.id})
        .exec()
        .then((user)=>{
            if(user.length<1){
                res.status(410).json({
                    message:"Something went wrong, this account don't exist"
                })
            } else {
                // console.log(req.body);
                // var path_temp=req.myimg.path;
                // var currentFolder=__dirname+'/uploads';
                // var filename="profil_img"+req.body.id+path.extname(path_temp);
                // var new_path=currentFolder+'/'+filename;
                // fs.move(path_temp,new_path,function(err){
                //     if (err) return console.error(err)
                //     console.log("file uploaded!")
    
                // });
                
                user[0].grad=req.body.grad;
                user[0].description=req.body.descriere;
                //user[0].imgUrl=new_path;
                user[0].role=2;
                console.log(user[0]);
                user[0].save()
                    .then(async(result)=> {
                        await result
                            .save()
                            .then((result1)=>{
                                console.log('User modified ')
                                res.status(201).json({
                                }) 
                            })
                            .catch((err)=>{
                                console.log(err);
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
        });

}

module.exports = {
    userLogin,
    userRegister,
    getUser,
    UpgradeUser,
};