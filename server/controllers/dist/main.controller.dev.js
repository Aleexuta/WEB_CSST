"use strict";

var bcrypt = require("bcrypt");

require("dotenv").config();

var jwt = require("jsonwebtoken");

var User = require("../Models/user");

var mongoose = require('mongoose');

var date = require('date-and-time');

var _require = require("../Models/user"),
    db = _require.db;

var MainFetch = function MainFetch(req, res, next) {
  console.log("ceva");
  User.find({
    role: 1
  }, function (err, data) {
    console.log(data);
    res.render('index', {
      user: req.user,
      sportiviArray: data
    });
  });
};

module.exports = {
  MainFetch: MainFetch
};