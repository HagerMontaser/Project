//require mongoose
const mongoose = require("mongoose");


//Create Schema 
let EventSchema = new mongoose.Schema({
    _id : Number,
    Title : {type: String , required:true},
    EventDate : {type:String},
    MainSpeakerId : [{type : mongoose.Types.ObjectId, ref:"speakers"}],
    OtherSpeakers : [{type: mongoose.Types.ObjectId,ref:"speakers" }],
    Students : [{type: Number , ref:"students"}]
});

//register schema with collection
module.exports=mongoose.model("events",EventSchema);