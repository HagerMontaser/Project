//require express
const express = require("express");

//require express-validator
const {body,param,query} = require("express-validator");
const validator = require('validator');

//require authentication middleware
const authMW=require("./../MiddleWares/AuthenMiddleWare");

//require EventController
const controller = require("./../Controllers/EventController");

//require Event model
const Event = require("./../Models/EventModel");
const Speaker = require("./../Models/SpeakerModel");
const Student = require("./../Models/StudentModel");



//create router object
const router = express.Router();

let OtherSpeakersIds = [];
let StudentsIds = [];


//route of Event - httpMethods
router.route("/events")
.get(authMW,controller.GetAllEvents)
.post(authMW,
    [
        body("id").isNumeric().withMessage("ID should be number")
        .custom((value,{req}) => {
            return Event.findOne({ _id : req.body.id })
            .then((data)=>{
                if(data)
                    throw new Error("ID already in use");
            })
        }),
        body("title").isString().withMessage("Title should be string")
        .not().isEmpty().withMessage("Title is empty"),
        body("mainspeakerid").isMongoId().withMessage("Main speaker Id should be object id")
        .custom((value,{req}) => {
            if(validator.isMongoId(req.body.mainspeakerid))
            {
                return Speaker.findOne({ _id : req.body.mainspeakerid })
                .then((data)=>{
                    if(data==null)
                    {
                        throw new Error("Speaker Id is not found");
                    }
                })
            }
            else{
                throw new Error(" ");
            }
        }),
        body("otherspeakers").isArray().withMessage("Other speaker should be array ")
        .custom(async (value,{req}) => {

            if(!(new Set(req.body.otherspeakers).size != req.body.otherspeakers.length)) //check that there is not duplicated date in array
            {
                for(var speakerid of req.body.otherspeakers)
                {
                    //check if speaker id is object id and not equal main speaker id
                    if(validator.isMongoId(speakerid) && (speakerid!==req.body.mainspeakerid))
                    {
                        await Speaker.findOne({ _id : speakerid })
                        .then((data)=>{
                            if(data!=null)
                            {
                                OtherSpeakersIds.push(speakerid);
                            }
                            else
                            {
                                throw new Error("Speaker ID: "+speakerid+" not found")
                            }
                        })
                    }
                    else{
                        throw new Error("Speaker Id invalid");
                    }
                }
                return OtherSpeakersIds;
            }
            else
            {
                throw new Error("There is duplicated speaker");
            }
        }),
        body("otherspeakers.*").isMongoId().withMessage("Other Speakers Ids should be object IDs"),
        body("students").isArray().withMessage("students should be array ")
        .custom(async (value,{req}) => {

            if(!(new Set(req.body.students).size != req.body.students.length)) //check that there is not duplicated date in array
            {
                for(var studentid of req.body.students)
                {
                    //check if student id is object id 
                    if(!isNaN(studentid))
                    {
                        await Student.findOne({ _id : studentid })
                        .then((data)=>{
                            if(data!=null)
                            {
                                StudentsIds.push(studentid);
                            }
                            else
                            {
                                throw new Error("student ID: "+studentid +" not found")
                            }
                        })
                    }
                    else{
                        throw new Error("student Id invalid");
                    }
                }
                return StudentsIds;
            }
            else
            {
                throw new Error("There is duplicated student");
            }
        })

    ],controller.CreateEvent)
.put(authMW,
    [
        body("id").isNumeric().withMessage("ID should be number")
        .custom((value,{req}) => {
            return Event.findOne({ _id : req.body.id })
            .then((data)=>{
                if(!data)
                    throw new Error("Event ID not found");
            })
        }),
        body("title").isString().withMessage("Title should be string")
        .not().isEmpty().withMessage("Title is empty"),
        body("mainspeakerid").isMongoId().withMessage("Main speaker Id should be object id")
        .custom((value,{req}) => {
            if(validator.isMongoId(req.body.mainspeakerid))
            {
                return Speaker.findOne({ _id : req.body.mainspeakerid })
                .then((data)=>{
                    if(data==null)
                    {
                        throw new Error("Speaker Id is not found");
                    }
                })
            }
            else{
                throw new Error(" ");
            }
        }),
        body("otherspeakers").isArray().withMessage("Other speaker should be array ")
        .custom(async (value,{req}) => {

            if(!(new Set(req.body.otherspeakers).size != req.body.otherspeakers.length)) //check that there is not duplicated date in array
            {
                for(var speakerid of req.body.otherspeakers)
                {
                    //check if speaker id is object id and not equal main speaker id
                    if(validator.isMongoId(speakerid) && (speakerid!==req.body.mainspeakerid))
                    {
                        await Speaker.findOne({ _id : speakerid })
                        .then((data)=>{
                            if(data!=null)
                            {
                                OtherSpeakersIds.push(speakerid);
                            }
                            else
                            {
                                throw new Error("Speaker ID: "+speakerid+" not found")
                            }
                        })
                    }
                    else{
                        throw new Error("Speaker Id invalid");
                    }
                }
                return OtherSpeakersIds;
            }
            else
            {
                throw new Error("There is duplicated speaker");
            }
        }),
        body("otherspeakers.*").isMongoId().withMessage("Other Speakers Ids should be object IDs"),
        body("students").isArray().withMessage("students should be array ")
        .custom(async (value,{req}) => {

            if(!(new Set(req.body.students).size != req.body.students.length)) //check that there is not duplicated date in array
            {
                for(var studentid of req.body.students)
                {
                    //check if student id is object id 
                    if(!isNaN(studentid))
                    {
                        await Student.findOne({ _id : studentid })
                        .then((data)=>{
                            if(data!=null)
                            {
                                StudentsIds.push(studentid);
                            }
                            else
                            {
                                throw new Error("student ID: "+studentid +" not found")
                            }
                        })
                    }
                    else{
                        throw new Error("student Id invalid");
                    }
                }
                return StudentsIds;
            }
            else
            {
                throw new Error("There is duplicated student");
            }
        })

    ],controller.UpdateEvent)
.delete(authMW,
    [
        body("id").isNumeric().withMessage("ID should be number") 
    ],controller.DeleteEvent)


router.get("/events/:id",authMW,
[
    param("id").isNumeric().withMessage("ID should be number") 
]
,controller.GetEventById);

module.exports = router;