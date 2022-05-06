const mongoose=require("mongoose");

const courseSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    instructor:String,
    imgUrl:String,
    date:[
        {
            ziua:String,
            oraInceput:String
        }
    ]
})

module.exports=mongoose.model("Course",courseSchema);