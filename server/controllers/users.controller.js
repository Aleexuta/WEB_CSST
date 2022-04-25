const bcrypt = require("bcrypt");
require("../node_modules/dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const mongoose=require('mongoose');

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
                        courses:[]
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

module.exports = {
    userLogin,
    userRegister,
  };