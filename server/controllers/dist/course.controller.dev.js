"use strict";

var bcrypt = require("bcrypt");

require("../node_modules/dotenv").config();

var Course = require("../Models/courses");

var mongoose = require('mongoose');

var path = require('path');

var fs = require('fs-extra');

var fs = require('fs-extra');

var formidable = require("formidable");

var multer = require('multer');

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

var AddCourse = function AddCourse(req, res, next) {
  console.log("sunt in add course");
  console.log(JSON.stringify(req.body));
  console.log(JSON.stringify(req.file));
  var course = new Course({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    instructor: req.body.instructor,
    imgUrl: req.file.path.replace("\\", "/"),
    date: [{
      ziua: req.body.day[0],
      oraInceput: req.body.time[0]
    }, {
      ziua: req.body.day[1],
      oraInceput: req.body.time[1]
    }, {
      ziua: req.body.day[2],
      oraInceput: req.body.time[2]
    }]
  });
  course.save().then(function _callee(result) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(result.save().then(function (result1) {
              console.log('Course created ' + result._id);
              res.status(201).json({
                message: "user creat"
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
  AddCourse: AddCourse
};