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
.put(authMW,
    [
        body("_id").isNumeric().withMessage("ID should be Numeric only"),
        body("email")
        // Checking if follow the email
        .isEmail().withMessage("Email incorrect")
        // Custom validation,Validate email in use or not
        .custom((value,{req}) => {
            return Student.findOne({ email : req.body.email })
            .then((data)=>{
                if(data)
                {
                    if(data._id.toString() !==req.body._id.toString())
                    {
                        throw new Error("Email already in use");  
                    }
                }
            })
        }),
        body("password").isString().withMessage("Password should be alphanumeric")
    ],controller.UpdateStudent)

router.delete("/students/:_id",authMW,
    [
        param("_id").isNumeric().withMessage("ID should be Numeric only")
        
    ],controller.DeleteStudent)


router.get("/students/:_id",authMW,
[
    param("_id").isNumeric().withMessage("ID should be Numeric only")
]
,controller.GetStudentById);

module.exports = router;