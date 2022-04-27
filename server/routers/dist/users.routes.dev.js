"use strict";

var express = require('express'); //const checkAuth=require('..')


var userControllers = require('../controllers/users.controller');

var router = express.Router();
router.post('/signup', userControllers.userRegister);
router.post('/login', userControllers.userLogin);
router.get('/getme/:userid', userControllers.getUser);
router.get('/getuser/:userid', userControllers.getUser);
router.post('/upgrade/:userid', userControllers.UpgradeUser);
module.exports = router;