//require express-validator  
const {validationResult}=require("express-validator");

//require mongoose
const mongoose = require("mongoose");

//require speaker model
const Speaker = require("./../Models/SpeakerModel");


//Method --> Check data is valid or not
function checkValid(request){
    //validate the request
    let result = validationResult(request);
    //check result if not empty , there are errors
    if (!result.isEmpty())
    {
        //prepare message of error
        let message = result.array().reduce((current,error)=>current+error.msg+" "," ");
        //create error 
        let error = new Error(message);
        //set status of validation error
        error.status = 422;
        //throw error
        throw error;
    }
}


//Get all speakers method
module.exports.GetAllSpeakers = (request,response,next)=>{
    //response.status(200).json({message :"speaker list"});
    
    Speaker.find({})
    .then((data)=>{
        response.status(200).json({data});
    })
    .catch((error) => {
        next(error);
    })
}

//Get speaker by ID
module.exports.GetSpeakerById = (request,response,next)=>{
    //response.status(200).json({message :"speaker by ID"});
    
    checkValid(request);
    
    //find speaker when its id == id of request
    Speaker.find({_id:request.params.id})
    .then((data)=>{
        //send json data of choosen speaker to front ent
        response.status(200).json({data});
    })
    .catch(error => {
        next(error);
    })
}

//create speaker
module.exports.CreateSpeaker = (request,response,next)=>{
    //response.status(201).json({message :"speaker created"});
    
    //Check data valid or not
    checkValid(request);

    //if data is valid create new speaker in database
    let speaker = new Speaker({
        _id: mongoose.Types.ObjectId(),
        Email:request.body.email,
        UserName:request.body.username,
        Password:request.body.password,
        City : request.body.city,
        Street : request.body.street,
        Building : request.body.building
    });

    //save in database
    speaker.save()
    .then((data)=>{
        response.status(201).json({message:"Speaker created",data})
    })
    .catch(error=>next(error))
}

//Update Speaker
module.exports.UpdateSpeaker = (request,response,next)=>{
    //response.status(200).json({message :"speaker updated"});
    
    //Check data valid or not
    checkValid(request);

    //update speaker by id
    Speaker.updateOne({_id:request.body.id},{
        $set:{
            Email:request.body.email,
            UserName:request.body.username,
            Password:request.body.password,
            City : request.body.city,
            Street : request.body.street,
            Building : request.body.building
        }
    })
    .then(data => {
        //if speaker is not found in database.
        if(data.matchedCount == 0)
            throw new Error("Speaker not exist");
        
        response.status(200).json({message:"Speaker updated",data});
    })
    .catch(error => next(error))
}

//Delete Speaker
module.exports.DeleteSpeaker = (request,response,next)=>{
    //response.status(200).json({message :"speaker deleted"});
    
    //Check data valid or not
    checkValid(request);

    //delete speaker
    Speaker.findOneAndDelete({_id:request.body.id})
    .then(data => {
        if (data)
            response.status(200).json({message :"speaker deleted"});

        throw new Error("Speaker not exist");
    })
    .catch(error=>next(error))
}