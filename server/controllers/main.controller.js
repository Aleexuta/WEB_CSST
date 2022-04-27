const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const mongoose=require('mongoose');
const date = require('date-and-time');
const { db } = require("../Models/user");

const MainFetch=(req,res,next) => {
    console.log("ceva");
    User.find({role:1},function(err,data){
        console.log(data);
        res.render('index',{
            user:req.user,
            sportiviArray:data
        });
    });
}
module.exports = {
    MainFetch
  };