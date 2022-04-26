//require mongoose
const mongoose = require("mongoose");


//Create Schema 
let EventSchema = new mongoose.Schema({
    _id : Number,
    Title : {type: String , required:true},
    EventDate : {type:Date},
    MainSpeakerId : {type : mongoose.Types.ObjectId , ref:"events"},
    OtherSpeakers : [{type: mongoose.Types.ObjectId,ref:"events" }],
    Students : [{type: Number , ref:"students"}]
});

//register schema with collection
module.exports=mongoose.model("events",EventSchema);