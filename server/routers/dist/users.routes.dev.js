"use strict";

var express = require('express'); //const checkAuth=require('..')


var userControllers = require('../controllers/users.controller');

var router = express.Router();

var multer = require('multer');

var upload = multer({
  dest: 'uploads/'
});
router.post('/signup', userControllers.userRegister);
router.post('/login', userControllers.userLogin);
router.get('/getme/:userid', userControllers.getUser);
router.get('/getuser/:userid', userControllers.getUser);
router.post('/upgradeUser', userControllers.UpgradeUser);
module.exports = router;