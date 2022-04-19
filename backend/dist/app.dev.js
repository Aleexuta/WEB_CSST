"use strict";

var express = require("express");

var bodyParser = require("body-parser");

var mongoose = require("mongoose");

var path = require("path");

var exp = require("constants");

var app = express();
var port = process.env.PORT || 3000;
var static_path = path.join(__dirname, "../frontend");
app.use(express["static"](static_path));
app.set();
app.use(bodyParser.json());
app.use(express["static"]('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
mongoose.connect('mongodb://localhost:27017/WEB_DB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error', function () {
  return console.log("Error in connecting database");
});
db.once('open', function () {
  return console.log("Connected to database");
});
app.get("/", function (req, res) {
  res.set({
    "Allow access": "*"
  });
  return res.redirect('index.html');
}).listen(3000);
app.post("/signup", function _callee(req, res) {
  var firstname, lastname, birth, username, email, pass, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          firstname = req.body.firstname;
          lastname = req.body.lastname;
          birth = req.body.birth;
          username = req.body.username;
          email = req.body.email;
          pass = req.body.psw;
          pass = req.body.psw - repeat;
          console.log('${email} and ${pass}');
          data = {
            "firstname": firstname,
            "lastname": lastname,
            "birth": birth,
            "username": username,
            "email": email,
            "pass": pass,
            "courses": "[]"
          };
          db.collection('User').insertOne(data, function (err, collection) {
            if (err) {
              throw err;
            }

            console.log("Record user inserted succesfully");
          });
          return _context.abrupt("return", res.redirect('../frontend/login.html'));

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          res.status(400).send("invalid ceva");

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
});
app.get("/signup", function (req, rew) {
  res.render("login");
});
console.log("listening on port 3000");