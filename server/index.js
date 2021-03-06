var express = require('express');
var logger = require('morgan');
const multer = require('multer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

var userRouter=require('./routers/users.routes');
var mainRouter=require('./routers/main.routes');
var courseRouter=require('./routers/course.routes');
var articleRouter=require('./routers/article.routes');
const res = require('express/lib/response');

var app=express();
app.use(express.static('../public'))
app.use('/uploads',express.static(__dirname+"/uploads"))
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
const dbURI='mongodb://localhost:27017/WEB_DB'

var storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./uploads')
  },
  filename:function(req,file,cb){
    cb(null,file.originalname)
  }
});
var upload =multer({storage:storage});

mongoose
    .connect(dbURI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>console.log("Database connected"))
    .catch((err)=>console.log(err));
mongoose.Promise=global.Promise;


app.post('/upload-image',upload.single('myimg'),function(req,res,next){
  console.log(JSON.stringify(req))
  console.log(JSON.stringify(file));
  response+=req.file.path;
  return res.send(response);
})

app.use('/course',courseRouter);
app.use('/article',articleRouter);
app.use('/user',userRouter);
app.use('/',mainRouter);

app.get("/",(req,res)=>{
  //console.log("cevaaaa")
  res.redirect("/0");
})




// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(err.status || 404).json({
      message: "No such route exists"
    })
});

// error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500).json({
      message: err
    })
});


app.listen(3005,() =>{
  console.log("is listening on 3005");
})

module.exports = app;
