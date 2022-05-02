//require mongoose
const mongoose = require("mongoose");


//Create Schema 
let SpeakerSchema = new mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    email : {type: String},
    username : {type:String},
    password : {type : String},
    city : {type:String },
    street : {type:String},
    building :{type:String}
});

//register schema with collection
module.exports=mongoose.model("speakers",SpeakerSchema);