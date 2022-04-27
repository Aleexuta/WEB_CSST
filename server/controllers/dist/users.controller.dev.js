"use strict";

var bcrypt = require("bcrypt");

require("../node_modules/dotenv").config();

var jwt = require("jsonwebtoken");

var User = require("../Models/user");

var mongoose = require('mongoose');

var date = require('date-and-time');

var userRegister = function userRegister(req, res, next) {
  User.find({
    $or: [{
      email: req.body.email
    }, {
      username: req.body.username
    }]
  }).exec().then(function (user) {
    if (user.length >= 1) {
      res.status(409).json({
        message: "Email or username exists"
      });
    } else {
      if (req.body.psw != req.body.pswr) {
        res.status(420).json({
          message: "Password are not the same"
        });
      } else {
        var _user = new User({
          _id: new mongoose.Types.ObjectId(),
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          birthday: req.body.birthday,
          username: req.body.username,
          email: req.body.email,
          password: req.body.psw,
          role: 1,
          courses: []
        });

        _user.save().then(function _callee(result) {
          return regeneratorRuntime.async(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return regeneratorRuntime.awrap(result.save().then(function (result1) {
                    console.log('User created ' + result._id);
                    res.status(201).json({
                      userDetails: {
                        userId: result._id
                      }
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
      }
    }
  })["catch"](function (err) {
    console.log(err);
    res.status(500).json({
      message: err.toString()
    });
  });
};

var userLogin = function userLogin(req, res, next) {
  User.find({
    $and: [{
      password: req.body.password
    }, {
      username: req.body.username
    }]
  }).exec().then(function (user) {
    if (user.length < 1) {
      res.status(410).json({
        message: "Username or password are not correct"
      });
    } else {
      console.log(user[0]);
      res.status(202).json({
        userDetails: {
          userId: user[0]._id,
          role: user[0].role
        }
      });
    }
  })["catch"](function (err) {
    console.log(err);
    res.status(500).json({
      message: err.toString()
    });
  });
};

var getUser = function getUser(req, res, next) {
  User.find({
    _id: req.params.userid
  }).exec().then(function (user) {
    if (user.length < 1) {
      res.status(410).json({
        message: "Something went wrong, this account don't exist"
      });
    } else {
      console.log(user[0].firstname);
      var bir = user[0].birthday;
      var data = {
        userDetails: {
          userId: user[0]._id,
          firstname: user[0].firstname,
          lastname: user[0].lastname,
          username: user[0].username,
          birthday: date.format(bir, 'DD/MM/YYYY'),
          email: user[0].email,
          courses: user[0].courses
        }
      }; //app.set('views', __dirname + '../views');

      res.render('profil', {
        data: data
      });
    }
  })["catch"](function (err) {
    console.log(err);
    res.status(500).json({
      message: err.toString()
    });
  });
};

var UpgradeUser = function UpgradeUser(req, res, next) {//update la user
};

module.exports = {
  userLogin: userLogin,
  userRegister: userRegister,
  getUser: getUser,
  UpgradeUser: UpgradeUser
};