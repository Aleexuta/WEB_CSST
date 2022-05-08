const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const Course=require("../Models/courses");
const mongoose=require('mongoose');
const multer=require('multer');
const date = require('date-and-time');
const { db } = require("../Models/user");


const main=require('../controllers/main.controller')

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
    const data={'sportiviArray':sportiviArray,'instructoriArray' :instructoriArray,'cursuriArray':coursesArray}=await Promise.all([
        getSportivi(), getInstructori(),getCourses()]);
    
    res.render("index",{
        date:data
    });
}


module.exports = {
    MainFetch,
  };