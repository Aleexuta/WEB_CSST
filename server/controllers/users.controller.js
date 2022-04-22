const bcrypt = require("bcrypt");
require("../node_modules/dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const mongoose=require('mongoose');

const userRegister=(req,res,next) => {
    console.log("sunt in user register");
    User.find({email:req.body.email})
        .exec()
        .then((user)=> {
            if(user.length>=1){
                res.status(409).json({
                    message:"Email exists"
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
                        password:req.body.psw
                    });
                    user.save()
                        .then(async(result)=> {
                            await result
                                .save()
                                .then((result1)=>{
                                    console.log('User created ${result}')
                                    res.status(201).json({
                                        userDetails:{
                                            userId:result._id,
                                        },
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
                messahe:err.toString()
            })
        });
}

module.exports = {
    //userLogin,
    userRegister,
  };