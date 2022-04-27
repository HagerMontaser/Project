//require express
const express = require("express");

//require express-validator
const {body,param,query} = require("express-validator");

//require authentication middleware
const authMW=require("./../MiddleWares/AuthenMiddleWare");

//require StudentController
const controller = require("./../Controllers/StudentController");

//require Student model
const Student = require("./../Models/StudentModel");

//create router object
const router = express.Router();

//use authentication middleware
// router.use(authMW);

//route of student - httpMethods
router.route("/students")
.get(authMW,controller.GetAllStudents)
.post(
    [
        body("id").isNumeric().withMessage("ID should be Numeric only")
        .custom((value,{req}) => {
            return Student.findOne({ _id : req.body.id })
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
            return Student.findOne({ Email : req.body.email })
            .then((data)=>{
                if(data)
                    throw new Error("Email already in use");
            })
        }),
        body("password").isAlphanumeric().withMessage("Password should be alphanumeric")
        
    ],controller.CreateStudent)
.put(authMW,
    [
        body("id").isNumeric().withMessage("ID should be Numeric only"),
        body("email")
        // Checking if follow the email
        .isEmail().withMessage("Email incorrect")
        // Custom validation,Validate email in use or not
        .custom((value,{req}) => {
            return Student.findOne({ Email : req.body.email })
            .then((data)=>{
                if(data)
                {
                    if(data._id.toString() !==req.body.id.toString())
                    {
                        throw new Error("Email already in use");  
                    }
                }
            })
        }),
        body("password").isAlphanumeric().withMessage("Password should be alphanumeric")
    ],controller.UpdateStudent)
.delete(authMW,
    [
        body("id").isNumeric().withMessage("ID should be Numeric only")
        
    ],controller.DeleteStudent)


router.get("/students/:id",authMW,
[
    param("id").isNumeric().withMessage("ID should be Numeric only")
]
,controller.GetStudentById);

module.exports = router;