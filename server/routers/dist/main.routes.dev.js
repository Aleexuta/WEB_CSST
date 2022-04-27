"use strict";

var express = require('express'); //const checkAuth=require('..')


var userControllers = require('../controllers/main.controller');

var router = express.Router();
router.get('/', userControllers.MainFetch);
module.exports = router;