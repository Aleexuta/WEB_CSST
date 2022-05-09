"use strict";

var mongoose = require("mongoose");

var articleSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  link: String,
  imgUrl: String
});
module.exports = mongoose.model("Article", articleSchema);