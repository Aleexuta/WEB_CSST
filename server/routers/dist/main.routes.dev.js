"use strict";

var express = require('express'); //const checkAuth=require('..')


var mainControllers = require('../controllers/main.controller');

var router = express.Router();
router.get('/', mainControllers.MainFetch);
module.exports = router;