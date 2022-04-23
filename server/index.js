var express = require('express');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

var userRouter=require('./routers/users.routes');

var app=express();
app.use(express.static('../public'))
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const dbURI='mongodb://localhost:27017/WEB_DB'

mongoose
    .connect(dbURI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>console.log("Database connected"))
    .catch((err)=>console.log(err));
mongoose.Promise=global.Promise;

app.use('/user',userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(err.status || 404).json({
      message: "No such route exists"
    })
});

// error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500).json({
      message: "Error Message"
    })
});
app.get("/",(req,res)=>{
  console.log("response to root");
  
})
app.listen(3005,() =>{
  console.log("is listening on 3005");
})

module.exports = app;
