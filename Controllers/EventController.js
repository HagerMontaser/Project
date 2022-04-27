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
module.exports.GetAllEvents = (request,response,next)=>{
    //check if user is an admin
    if(request.role !== "admin")
    {
        throw new Error("Not Authorized");
    }
    event.find({})
    .then((data)=>{
        response.status(200).json({data});
    })
    .catch((error) => {
        next(error);
    })
}

//Get Event by ID
module.exports.GetEventById = (request,response,next)=>{
    //check if user is an admin
    if(request.role !== "admin")
    {
        throw new Error("Not Authorized");
    }
    checkValid(request);
    
    //find Event when its id == id of request
    event.find({_id:request.params.id})
    .then((data)=>{
        //send json data of choosen Event to front ent
        response.status(200).json({data});
    })
    .catch(error => {
        next(error);
    })
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
        _id: request.body.id,
        Title:request.body.title,
        EventDate:request.body.eventdate,
        MainSpeakerId:request.body.mainspeakerid,
        OtherSpeakers : request.body.otherspeakers,
        Students : request.body.students
    });

    //save in database
    Event.save()
    .then((data)=>{
        response.status(201).json({message:"Event created",data})
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
    event.updateOne({_id:request.body.id},{
        $set:{
            Title:request.body.title,
            EventDate:request.body.eventdate,
            // MainSpeakerId:request.body.mainspeakerid,
            // OtherSpeakers : request.body.otherspeakers,
            // Students : request.body.students
        }
    })
    .then(data => {
        //if Event is not found in database.
        if(data.matchedCount == 0)
            throw new Error("Event not exist");
        
        response.status(200).json({message:"Event updated",data});
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
    event.findOneAndDelete({_id:request.body.id})
    .then(data => {
        if (data==null)
        {
            throw new Error("Event not exist");
        }
        response.status(200).json({message :"Event deleted"});
    })
    .catch(error=>next(error))
}