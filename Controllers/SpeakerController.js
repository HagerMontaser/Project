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
    if(request.role !== "admin")
    {
        throw new Error("Not Authorized");
    }
    
    Speaker.find({})
    .then((data)=>{
        response.status(200).json(data);
    })
    .catch((error) => {
        next(error);
    })
}

//Get speaker by ID
module.exports.GetSpeakerById = (request,response,next)=>{
    //response.status(200).json({message :"speaker by ID"});
    if(request.role !== "admin")
    {
        throw new Error("Not Authorized");
    }

    checkValid(request);
    
    //find speaker when its id == id of request
    Speaker.findOne({_id:request.params._id})
    .then((data)=>{
        //send json data of choosen speaker to front ent
        response.status(200).json(data);
    })
    .catch(error => {
        next(error);
    })
}

//Update Speaker
module.exports.UpdateSpeaker = (request,response,next)=>{
    //response.status(200).json({message :"speaker updated"});
    
    //Check data valid or not
    checkValid(request);
    

    if(request.role === "speaker")
    {
        //update speaker by id
        Speaker.updateOne({_id:request._id},{
            $set:{
                email:request.body.email,
                username:request.body.username,
                password:request.body.password,
                city : request.body.city,
                street : request.body.street,
                building : request.body.building
            }
        })
        .then(data => {
            //if speaker is not found in database.
            if(data.matchedCount == 0)
                throw new Error("Speaker not exist");
            
            response.status(200).json({msg:"Speaker updated"});
        })
        .catch(error => next(error))
    }
    else if (request.role === "admin")
    {
             //update speaker by id
             Speaker.updateOne({_id:request.body._id},{
                $set:{
                    email:request.body.email,
                    city : request.body.city,
                    street : request.body.street,
                    building : request.body.building
                }
            })
            .then(data => {
                //if speaker is not found in database.
                if(data.matchedCount == 0)
                    throw new Error("Speaker not exist");
                
                response.status(200).json({msg:"Speaker updated"});
            })
            .catch(error => next(error))
    }
    else
    {
        throw new Error("Not Authorized");
    }
}

//Delete Speaker
module.exports.DeleteSpeaker = (request,response,next)=>{
    //response.status(200).json({message :"speaker deleted"});
    
    //Check data valid or not
    checkValid(request);

    //check if user is an admin
    if(request.role !== "admin")
    {
        throw new Error("Not Authorized");
    }
    //delete speaker
    Speaker.findOneAndDelete({_id:request.params._id})
    .then(data => {
        if (data==null)
        {
            throw new Error("Speaker not exist");
        }
        response.status(200).json({msg :"speaker deleted"});
    })
    .catch(error=>next(error))
}