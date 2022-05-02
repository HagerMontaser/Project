//require mongoose
const mongoose = require("mongoose");



//Create Schema 
let StudentSchema = new mongoose.Schema({
    _id : Number,
    email : {type: String},
    password : {type : String}
});



//register schema with collection
module.exports=mongoose.model("students",StudentSchema);