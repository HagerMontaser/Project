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
        body("_id").isNumeric().withMessage("ID should be number")
        .custom((value,{req}) => {
            return Event.findOne({ _id : req.body._id })
            .then((data)=>{
                if(data)
                    throw new Error("ID already in use");
            })
        }),
        body("Title").isString().withMessage("Title should be string")
        .not().isEmpty().withMessage("Title is empty"),
        body("MainSpeakerId").isMongoId().withMessage("Main speaker Id should be object id")
        .custom((value,{req}) => {
            if(validator.isMongoId(req.body.MainSpeakerId))
            {
                return Speaker.findOne({ _id : req.body.MainSpeakerId })
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
        body("OtherSpeakers").isArray().withMessage("Other speaker should be array ")
        .custom(async (value,{req}) => {

            if(!(new Set(req.body.OtherSpeakers).size != req.body.OtherSpeakers.length)) //check that there is not duplicated date in array
            {
                for(var speakerid of req.body.OtherSpeakers)
                {
                    //check if speaker id is object id and not equal main speaker id
                    if(validator.isMongoId(speakerid) && (speakerid!==req.body.MainSpeakerId))
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
        body("OtherSpeakers.*").isMongoId().withMessage("Other Speakers Ids should be object IDs"),
        body("Students").isArray().withMessage("students should be array ")
        .custom(async (value,{req}) => {

            if(!(new Set(req.body.Students).size != req.body.Students.length)) //check that there is not duplicated date in array
            {
                for(var studentid of req.body.Students)
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
        body("_id").isNumeric().withMessage("ID should be number")
        .custom((value,{req}) => {
            return Event.findOne({ _id : req.body._id })
            .then((data)=>{
                if(!data)
                    throw new Error("Event ID not found");
            })
        }),
        body("Title").isString().withMessage("Title should be string")
        .not().isEmpty().withMessage("Title is empty"),
        body("MainSpeakerId").isMongoId().withMessage("Main speaker Id should be object id")
        .custom((value,{req}) => {
            if(validator.isMongoId(req.body.MainSpeakerId))
            {
                return Speaker.findOne({ _id : req.body.MainSpeakerId })
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
        body("OtherSpeakers").isArray().withMessage("Other speaker should be array ")
        .custom(async (value,{req}) => {

            if(!(new Set(req.body.OtherSpeakers).size != req.body.OtherSpeakers.length)) //check that there is not duplicated date in array
            {
                for(var speakerid of req.body.OtherSpeakers)
                {
                    //check if speaker id is object id and not equal main speaker id
                    if(validator.isMongoId(speakerid) && (speakerid!==req.body.MainSpeakerId))
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
        body("OtherSpeakers.*").isMongoId().withMessage("Other Speakers Ids should be object IDs"),
        body("Students").isArray().withMessage("students should be array ")
        .custom(async (value,{req}) => {

            if(!(new Set(req.body.Students).size != req.body.Students.length)) //check that there is not duplicated date in array
            {
                for(var studentid of req.body.Students)
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

router.delete("/events/:_id",authMW,
    [
        param("_id").isNumeric().withMessage("ID should be number") 
    ],controller.DeleteEvent)


router.get("/events/:_id",authMW,
[
    param("_id").isNumeric().withMessage("ID should be number") 
]
,controller.GetEventById);

module.exports = router;