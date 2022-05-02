const express=require("express");

//require express-validator
const {body,param,query} = require("express-validator");

//require student model
const Student = require("./../Models/StudentModel");

//require speaker model
const Speaker = require("./../Models/SpeakerModel");

const router=express.Router();
const controller=require("./../Controllers/AuthenController")


router.post("/login",controller.login);
router.post("/registerstudent",[
    body("id").isNumeric().withMessage("ID should be Numeric only")
    .custom((value,{req}) => {
        return Student.findOne({ _id : req.body._id })
        .then((data)=>{
            if(data)
                throw new Error("ID already in use");
        })
    }),
    body("email")
    // Checking if follow the email
    .isEmail().withMessage("Email incorrect")
    // Custom validation,Validate email in use or not
    .custom((value,{req}) => {
        return Student.findOne({ email : req.body.email })
        .then((data)=>{
            if(data)
                throw new Error("Email already in use");
        })
    }),
    body("password").isAlphanumeric().withMessage("Password should be alphanumeric")
],controller.registerstudent);
router.post("/registerspeaker",[
    body("email")
            // Checking if follow the email
            .isEmail().withMessage("Email incorrect")
            // Custom validation,Validate email in use or not
            .custom((value,{req}) => {
                return Speaker.findOne({ email : req.body.email })
                .then((data)=>{
                    if(data)
                        throw new Error("Email already in use");
                })
            }),
            body("username").isAlpha().withMessage("UserName should be alphapetic characters only"),
            body("password").isAlphanumeric().withMessage("Password should be alphanumeric"),
            body("city").not().isEmpty().withMessage("City is empty"),
            body("street").not().isEmpty().withMessage("Street is empty"),
            body("building").not().isEmpty().withMessage("Building is empty")
],controller.registerspeaker);

module.exports=router;