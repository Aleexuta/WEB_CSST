"use strict";

var express = require('express');

var logger = require('morgan');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var userRouter = require('./routers/users.routes');

var mainRouter = require('./routers/main.routes');

var res = require('express/lib/response');

var app = express();
app.use(express["static"]('../public'));
app.use('/public', express["static"](__dirname + "../public"));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
var dbURI = 'mongodb://localhost:27017/WEB_DB';
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log("Database connected");
})["catch"](function (err) {
  return console.log(err);
});
mongoose.Promise = global.Promise;
app.use('/user', userRouter);
app.use('/', mainRouter);
app.get("/", function (req, res) {
  //console.log("cevaaaa")
  res.redirect("/main");
}); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  res.status(err.status || 404).json({
    message: "No such route exists"
  });
}); // error handler

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: err
  });
});
app.listen(3005, function () {
  console.log("is listening on 3005");
});
module.exports = app;