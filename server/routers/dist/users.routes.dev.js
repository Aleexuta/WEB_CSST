"use strict";

var express = require('express'); //const checkAuth=require('..')


var userControllers = require('../controllers/users.controller');

var multer = require("multer");

var router = express.Router();
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({
  storage: storage
});
router.post('/signup', userControllers.userRegister);
router.post('/login', userControllers.userLogin);
router.get('/getme/:userid', userControllers.getUser);
router.get('/getuser/:userid', userControllers.getUser);
router.post('/upgradeUser', upload.single('myimg'), userControllers.UpgradeUser);
router.get('/registerCourse/:userid/:courseid', userControllers.RegisterCourse);
module.exports = router;