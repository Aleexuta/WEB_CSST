"use strict";

var bcrypt = require("bcrypt");

require("dotenv").config();

var jwt = require("jsonwebtoken");

var User = require("../Models/user");

var mongoose = require('mongoose');

var multer = require('multer');

var date = require('date-and-time');

var _require = require("../Models/user"),
    db = _require.db;

var main = require('../controllers/main.controller');

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

function MainFetch(req, res, next) {
  var _ref;

  var data;
  return regeneratorRuntime.async(function MainFetch$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("ceva");
          _context.next = 3;
          return regeneratorRuntime.awrap(Promise.all([getSportivi(), getInstructori()]));

        case 3:
          _ref = _context.sent;
          sportiviArray = _ref['sportiviArray'];
          instructoriArray = _ref['instructoriArray'];
          data = _ref;
          res.render("index", {
            date: data
          });

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = {
  MainFetch: MainFetch
};