//require mongoose
const mongoose = require("mongoose");


//Create Schema 
let SpeakerSchema = new mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    Email : {type: String},
    UserName : {type:String},
    Password : {type : String},
    City : {type:String },
    Street : {type:String},
    Building :{type:String}
});

//register schema with collection
module.exports=mongoose.model("speakers",SpeakerSchema);