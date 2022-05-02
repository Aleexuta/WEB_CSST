"use strict";

var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstname: String,
  lastname: String,
  birthday: Date,
  username: String,
  email: String,
  password: String,
  role: Number,
  courses: [],
  grad: String,
  description: String,
  imgUrl: String,
  admin: Boolean
});
module.exports = mongoose.model("User", userSchema);