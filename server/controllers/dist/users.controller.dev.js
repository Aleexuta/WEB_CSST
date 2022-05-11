"use strict";

var bcrypt = require("bcrypt");

require("../node_modules/dotenv").config();

var jwt = require("jsonwebtoken");

var User = require("../Models/user");

var Course = require("../Models/courses");

var mongoose = require('mongoose');

var date = require('date-and-time');

var path = require('path');

var fs = require('fs-extra');

var fs = require('fs-extra');

var formidable = require("formidable");

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
          courses: [],
          grad: "",
          description: "",
          imgUrl: "",
          admin: false
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

var multer = require('multer');

var _require = require("readline"),
    cursorTo = _require.cursorTo;

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

var UpgradeUser = function UpgradeUser(req, res, next) {
  //update la instructor. primesc id ul si datele alea in plus
  console.log("sunt in upgrade"); //var parser=JSON.parse(req.body);

  console.log(JSON.stringify(req.body));
  console.log(JSON.stringify(req.file));
  User.find({
    _id: req.body.id
  }).exec().then(function (user) {
    if (user.length < 1) {
      res.status(410).json({
        message: "Something went wrong, this account don't exist"
      });
    } else {
      user[0].grad = req.body.grad;
      user[0].description = req.body.descriere;
      user[0].imgUrl = req.file.path.replace("\\", "/");
      user[0].role = 2;
      console.log(user[0]);
      user[0].save().then(function _callee2(result) {
        return regeneratorRuntime.async(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return regeneratorRuntime.awrap(result.save().then(function (result1) {
                  console.log('User modified ');
                  res.status(201).json({});
                })["catch"](function (err) {
                  console.log(err);
                  console.log(400).json({
                    message: err.toString()
                  });
                }));

              case 2:
              case "end":
                return _context2.stop();
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
  });
};

var RegisterCourse = function RegisterCourse(req, res, next) {
  console.log("inscriere curs de catre user");
  console.log(req.body.userid);
  User.find({
    _id: req.params.userid
  }).exec().then(function (user) {
    if (user.length < 1) {
      res.status(410).json({
        message: "Something went wrong, this account don't exist"
      });
    } else {
      Course.find({
        _id: req.params.courseid
      }).exec().then(function (course) {
        if (course.length < 1) {
          res.status(410).json({
            message: "Something went wrong, this course don't exist"
          });
        } else {
          //aici avem atat cursul cat si sportivul
          var cursnew = {
            _id: course[0]._id,
            name: course[0].name,
            date: course[0].date
          };
          user[0].courses.push(cursnew);
        }
      });
      console.log(user[0]);
      user[0].save().then(function _callee3(result) {
        return regeneratorRuntime.async(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return regeneratorRuntime.awrap(result.save().then(function (result1) {
                  console.log('User modified, added course');
                  res.status(201).json({
                    message: "all good"
                  });
                })["catch"](function (err) {
                  console.log(err);
                  console.log(400).json({
                    message: err.toString()
                  });
                }));

              case 2:
              case "end":
                return _context3.stop();
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
  });
};

var RemoveCourse = function RemoveCourse(req, res, next) {
  console.log("suntem in retragere din curs");
  User.find({
    _id: req.params.userid
  }).exec().then(function (user) {
    if (user.length < 1) {
      res.status(410).json({
        message: "Something went wrong, this account don't exist"
      });
    } else {
      var pos;

      for (var i = 0; i < user[0].courses.length; i++) {
        if (user[0].courses[i]._id == req.params.courseid) {
          pos = i;
        }

        user[0].courses.splice(pos, 1);
      }

      user[0].save().then(function _callee4(result) {
        return regeneratorRuntime.async(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return regeneratorRuntime.awrap(result.save().then(function (result1) {
                  console.log('User modified, added course');
                  res.status(201).json({
                    message: "all good"
                  });
                })["catch"](function (err) {
                  console.log(err);
                  console.log(400).json({
                    message: err.toString()
                  });
                }));

              case 2:
              case "end":
                return _context4.stop();
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
  });
};

var ChangePass = function ChangePass(req, res, next) {
  console.log("sunt in schimbare parola");
  console.log(req.body);
};

module.exports = {
  userLogin: userLogin,
  userRegister: userRegister,
  getUser: getUser,
  UpgradeUser: UpgradeUser,
  RegisterCourse: RegisterCourse,
  RemoveCourse: RemoveCourse,
  ChangePass: ChangePass
};