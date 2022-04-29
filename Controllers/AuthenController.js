//require json web token
const jwt = require('jsonwebtoken');

//require express-validator  
const {validationResult}=require("express-validator");

//require mongoose
const mongoose = require("mongoose");

//require bcrypt
const bcrypt = require("bcryptjs")

//require student model
const Student = require("./../Models/StudentModel");

//require speaker model
const Speaker = require("./../Models/SpeakerModel");

//Method --> Check data is valid or not
function checkValid(request){
    //validate the request
    let result = validationResult(request);
    console.log(result);
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


//login
module.exports.login=async(request,response,next)=>{
    let token;
    //connect to DB and check if user is admin or not
    if(request.body.email=="admin@gmail.com" && request.body.password=="admin123")
    {
        token = jwt.sign({
            _id:1,
            email:request.body.email,
            role:"admin"
        },"HagerMontaser5",{expiresIn:"24h"});
        response.status(200).json({msg:"login successful",token});
    }
    else //student or speaker
    {
        try{
            const speaker= await Speaker.findOne({Email:request.body.email});
            if(!speaker)
            {
                const student= await Student.findOne({Email:request.body.email});
                if(!student)
                {
                    throw new Error("Login not successful");
                }
                else
                {
                    bcrypt.compare(request.body.password, student.Password)
                    .then(function (result) {
                        if(result)
                        {
                            token = jwt.sign({
                                _id:student._id,
                                email:student.Email,
                                role:"student"
                            },"HagerMontaser5",{expiresIn:"24h"});
    
                            response.status(200).json({msg:"login succesful",token});
    
                        }
                        else
                        {
                            response.status(400).json({ message: "Login not succesful" })
                        }
                    })
                    .catch(error=>next(error))
                }
            }
            else
            {
                bcrypt.compare(request.body.password, speaker.Password)
                .then(function (result) {
                    if(result)
                    {
                        token = jwt.sign({
                            _id:speaker._id,
                            email:speaker.Email,
                            role:"speaker"
                        },"HagerMontaser5",{expiresIn:"24h"});
    
                        response.status(200).json({msg:"login succesful",token});
    
                    }
                    else
                    {
                        response.status(400).json({ message: "Login not succesful" })
                    }
                })
                .catch(error=>next(error))
            }
        }
        catch(error){
            next(error);
        }
    }
}

//register_student
module.exports.registerstudent=(request,response,next)=>{
    //Check data valid or not
    checkValid(request);

    bcrypt.hash(request.body.password, 10).then(async (hash) =>{
        //if data is valid create new student in database
        let student = new Student({
            _id: request.body.id,
            Email:request.body.email,
            Password:hash
        });
        //save in database
        student.save()
        .then((data)=>{
            response.status(201).json({message:"Student created",data})
        })
        .catch(error=>next(error))
    })
    
}

//register_speaker
module.exports.registerspeaker=(request,response,next)=>{

    //Check data valid or not
    checkValid(request);

    //encrypt password
    bcrypt.hash(request.body.password, 10).then(async (hash) =>{
        //if data is valid create new speaker in database
        let speaker = new Speaker({
            _id: mongoose.Types.ObjectId(),
            Email:request.body.email,
            UserName:request.body.username,
            Password:hash,
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
    })
}