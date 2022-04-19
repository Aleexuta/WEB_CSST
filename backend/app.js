var express =require("express");
var bodyParser=require("body-parser");
var mongoose=require("mongoose");

const path=require("path");
const exp = require("constants");
const app=express();
const port=process.env.PORT || 3000;
const static_path=path.join(__dirname,"../frontend")
app.use(express.static(static_path));
app.set()


app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/WEB_DB',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

var db=mongoose.connection;

db.on('error',()=>console.log("Error in connecting database"));
db.once('open',()=>console.log("Connected to database"));


app.get("/",(req,res)=>{
    res.set({
        "Allow access":"*"
    })
    return res.redirect('index.html');
}).listen(3000);

app.post("/signup",async(req,res)=>{
    try{
        var firstname=req.body.firstname;
        var lastname=req.body.lastname;
        var birth=req.body.birth;
        var username=req.body.username;
        var email=req.body.email;
        var pass=req.body.psw;
        var pass=req.body.psw-repeat;

        console.log('${email} and ${pass}');

        var data={
            "firstname":firstname,
            "lastname":lastname,
            "birth":birth,
            "username":username,
            "email":email,
            "pass":pass,
            "courses":"[]"
        }

        db.collection('User').insertOne(data,(err,collection)=>{
            if(err){
                throw err;
            }
            console.log("Record user inserted succesfully");
        })

        return res.redirect('../frontend/login.html');
    }catch(error){
        res.status(400).send("invalid ceva");
    }
    
});
app.get("/signup",(req,rew)=>{
    res.render("login");
})


console.log("listening on port 3000");