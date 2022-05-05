//require express-validator  
const {validationResult}=require("express-validator");

//require Event model
const event = require("../Models/EventModel");



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


//Get all events method
module.exports.GetAllEvents = async(request,response,next)=>{
    if(request.role === "admin")
    {
        checkValid(request);
        
        event.find({})
        .then((data)=>{
            response.status(200).json(data);
        })
        .catch((error) => {
            next(error);
        })
 
    }
    else if(request.role === "student")
    {
        event.find({Students:request._id})
        .then((data)=>{
            response.status(200).json(data);
        })
        .catch((error) => {
            next(error);
        })
    }
    else if(request.role === "speaker")
    {
        event.find({OtherSpeakers:request._id})
        .then((data)=>{
            if(data.length)
            {
                response.status(200).json(data);
            }
            else
            {
                event.find({MainSpeakerId:request._id})
                .then(data=>{
                    response.status(200).json(data);
                })
            }
        }).catch((error) => {next(error);})
    }
    else
    {
        throw new Error("Not Authorized");
    }
}

//Get Event by ID
module.exports.GetEventById = (request,response,next)=>{
    //check if user is an admin
    if(request.role === "admin")
    {
        checkValid(request);
    
        //find Event when its id == id of request
        event.findOne({_id:request.params._id})
        .then((data)=>{
            //send json data of choosen Event to front ent
            response.status(200).json(data);
        })
        .catch(error => {
            next(error);
        })
    }
    else if(request.role === "student")
    {

    }
    else if(request.role === "speaker")
    {

    }
    else
    {
        throw new Error("Not Authorized");
    }
    
}

//create Event
module.exports.CreateEvent = (request,response,next)=>{
    //check if user is an admin
    if(request.role !== "admin")
    {
        throw new Error("Not Authorized");
    }
  
    //Check data valid or not
    checkValid(request);

    //if data is valid create new Event in database
    let Event = new event({
        _id: request.body._id,
        Title:request.body.Title,
        EventDate:request.body.EventDate,
        MainSpeakerId:request.body.MainSpeakerId,
        OtherSpeakers : request.body.OtherSpeakers,
        Students : request.body.Students
    });

    //save in database
    Event.save()
    .then((data)=>{
        response.status(201).json(data)
    })
    .catch(error=>next(error))
}

//Update Event
module.exports.UpdateEvent = (request,response,next)=>{
    //check if user is an admin
    if(request.role !== "admin")
    {
        throw new Error("Not Authorized");
    }
    //Check data valid or not
    checkValid(request);
    
    //update Event by id
    event.updateOne({_id:request.body._id},{
        $set:{
            Title:request.body.Title,
            EventDate:request.body.EventDate,
            MainSpeakerId:request.body.MainSpeakerId,
            OtherSpeakers : request.body.OtherSpeakers,
            Students : request.body.Students
        }
    })
    .then(data => {
        //if Event is not found in database.
        if(data.matchedCount == 0)
            throw new Error("Event not exist");
        
        response.status(200).json({msg:"Event updated"});
    })
    .catch(error => next(error))
}

//Delete Event
module.exports.DeleteEvent = (request,response,next)=>{
    
    //Check data valid or not
    checkValid(request);
    
    //check if user is an admin
    if(request.role !== "admin")
    {
        throw new Error("Not Authorized");
    }

    //delete Event
    event.findOneAndDelete({_id:request.params._id})
    .then(data => {
        if (data==null)
        {
            throw new Error("Event not exist");
        }
        response.status(200).json({msg :"Event deleted"});
    })
    .catch(error=>next(error))
}