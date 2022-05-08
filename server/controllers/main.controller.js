const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const Course=require("../Models/courses");
const mongoose=require('mongoose');
const multer=require('multer');
const date = require('date-and-time');
const { db } = require("../Models/user");
var ObjectId = require('mongoose').Types.ObjectId;


const main=require('../controllers/main.controller')
function getMineProfile(idUser){
    //verificare 
    console.log("user id aici "+idUser);
    if(ObjectId.isValid(idUser)){
        console.log("user id valid  ")
        return User.find({_id:idUser})
    }
    else { 
        return [];
    }
}
function getSportivi(req,res){
    return User.find({role:1});
}
function getInstructori(){
    return User.find({role:2});
}
function getCourses(){
    return Course.find();
}
async function MainFetch(req,res,next) {
    const data={'sportiviArray':sportiviArray,'instructoriArray' :instructoriArray,
    'cursuriArray':coursesArray, 'profilulmeu':profilulmeu
    }=await Promise.all([
        getSportivi(), getInstructori(),getCourses(),getMineProfile(req.params.userid)]);
    console.log(req.params.userid);
    res.render("index",{
        date:data
    });
}


module.exports = {
    MainFetch,
  };