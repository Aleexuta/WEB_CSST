const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../Models/user");
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
async function MainFetch(req,res,next) {
    console.log("ceva");
    const data={'sportiviArray':sportiviArray,'instructoriArray' :instructoriArray}=await Promise.all([
        getSportivi(), getInstructori()]);
    
    res.render("index",{
        date:data
    });
}


module.exports = {
    MainFetch,
  };