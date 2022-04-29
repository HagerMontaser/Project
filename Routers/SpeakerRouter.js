//require express
const express = require("express");

//require express-validator
const {body,param,query} = require("express-validator");

//require authentication middleware
const authMW=require("./../MiddleWares/AuthenMiddleWare");

//require SpeakerController
const controller = require("./../Controllers/SpeakerController");

//require speaker model
const Speaker = require("./../Models/SpeakerModel");

//create router object
const router = express.Router();

//use authentication middleware
// router.use(authMW);

//route of speaker - httpMethods
router.route("/speakers")

.get(authMW,controller.GetAllSpeakers)
// .post(
//     [
//         body("email")
//         // Checking if follow the email
//         .isEmail().withMessage("Email incorrect")
//         // Custom validation,Validate email in use or not
//         .custom((value,{req}) => {
//             return Speaker.findOne({ Email : req.body.email })
//             .then((data)=>{
//                 if(data)
//                     throw new Error("Email already in use");
//             })
//         }),
//         body("username").isAlpha().withMessage("UserName should be alphapetic characters only"),
//         body("password").isAlphanumeric().withMessage("Password should be alphanumeric"),
//         body("city").not().isEmpty().withMessage("City is empty"),
//         body("street").not().isEmpty().withMessage("Street is empty"),
//         body("building").not().isEmpty().withMessage("Building is empty")

//     ],controller.CreateSpeaker)
.put(authMW,
    [
        body("id").isMongoId().withMessage("ID should be object id"),
        body("email")
        // Checking if follow the email
        .isEmail().withMessage("Email incorrect")
        // Custom validation,Validate email in use or not
        .custom((value,{req}) => {
            return Speaker.findOne({ Email : req.body.email })
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
        body("username").isAlpha().withMessage("UserName should be alphapetic characters only"),
        body("password").isAlphanumeric().withMessage("Password should be alphanumeric"),
        body("city").not().isEmpty().withMessage("City is empty"),
        body("street").not().isEmpty().withMessage("Street is empty"),
        body("building").not().isEmpty().withMessage("Building is empty")
    ],controller.UpdateSpeaker)
.delete(authMW,
    [
        body("id").isMongoId().withMessage("ID should be object id")
    ],controller.DeleteSpeaker)

// validator.isMongoId(request.)
router.get("/speakers/:id",authMW,
[
    param("id").isMongoId().withMessage("ID should be object id")
]
,controller.GetSpeakerById);

module.exports = router;