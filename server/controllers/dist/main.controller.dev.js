"use strict";

var bcrypt = require("bcrypt");

require("dotenv").config();

var jwt = require("jsonwebtoken");

var User = require("../Models/user");

var Course = require("../Models/courses");

var Article = require("../Models/article.js");

var mongoose = require('mongoose');

var multer = require('multer');

var date = require('date-and-time');

var _require = require("../Models/user"),
    db = _require.db;

var ObjectId = require('mongoose').Types.ObjectId;

function getArticles() {
  return Article.find();
}

function getMineProfile(idUser) {
  //verificare 
  console.log("user id aici " + idUser);

  if (ObjectId.isValid(idUser)) {
    console.log("user id valid  ");
    return User.find({
      _id: idUser
    });
  } else {
    return [];
  }
}

function getSportivi(req, res) {
  return User.find({
    role: 1
  });
}

function getInstructori() {
  return User.find({
    role: 2
  });
}

function getCourses() {
  return Course.find();
}

function MainFetch(req, res, next) {
  var _ref;

  var data;
  return regeneratorRuntime.async(function MainFetch$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Promise.all([getSportivi(), getInstructori(), getCourses(), getMineProfile(req.params.userid), getArticles()]));

        case 2:
          _ref = _context.sent;
          sportiviArray = _ref['sportiviArray'];
          instructoriArray = _ref['instructoriArray'];
          coursesArray = _ref['cursuriArray'];
          profilulmeu = _ref['profilulmeu'];
          articlearray = _ref['articlearray'];
          data = _ref;
          console.log(req.params.userid);
          res.render("index", {
            date: data
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = {
  MainFetch: MainFetch
};