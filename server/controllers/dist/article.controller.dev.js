"use strict";

var bcrypt = require("bcrypt");

require("../node_modules/dotenv").config();

var Article = require("../Models/article");

var mongoose = require('mongoose');

var path = require('path');

var fs = require('fs-extra');

var fs = require('fs-extra');

var formidable = require("formidable");

var multer = require("multer");

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

var AddArticle = function AddArticle(req, res, next) {
  console.log("sunt in add article");
  console.log(JSON.stringify(req.body));
  console.log(JSON.stringify(req.file));
  var article = new Article({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    link: req.body.link,
    imgUrl: req.file.path.replace("\\", "/")
  });
  article.save().then(function _callee(result) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(result.save().then(function (result1) {
              console.log('Article created ' + result._id);
              res.status(201).json({
                message: "articol creat"
              });
            })["catch"](function (err) {
              console.log(400).json({
                message: err.toString()
              });
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  })["catch"](function (err) {
    console.log(err);
    res.status(500).json({
      message: err.toString()
    });
  });
};

module.exports = {
  AddArticle: AddArticle
};