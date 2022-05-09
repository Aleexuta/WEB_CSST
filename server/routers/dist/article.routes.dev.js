"use strict";

var express = require('express'); //const checkAuth=require('..')


var articleControllers = require('../controllers/article.controller');

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
router.post('/add', upload.single('myimg'), articleControllers.AddArticle);
module.exports = router;