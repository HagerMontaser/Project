//require json web token
const jwt = require('jsonwebtoken');

//require student
const Student = require("./../Models/StudentModel");

//require speaker
const Speaker = require("./../Models/SpeakerModel");

module.exports.login=(request,response,next)=>{
    let token;
    //connect to DB and check if user is admin or not
    if(request.body.email=="admin@gmail.com" && request.body.password=="admin123")
    {
        token = jwt.sign({
            _id:1,
            email:request.body.email,
            role:"admin"
        },"HagerMontaser5",{expiresIn:"24h"});
        response.status(200).json({msg:"login",token});
    }
    else //student or speaker
    {
        //check if user is student
        Student.findOne({Email:request.body.email,Password:request.body.password})
        .then(async data=>{
            if(data == null)
            {
                //check if user is speaker
                await Speaker.findOne({Email:request.body.email,Password:request.body.password})
                .then(data=>{
                    if(data == null)
                    {
                        throw new Error("UserName and Password inCorrect");
                    }
                    token = jwt.sign({
                        _id:data._id,
                        email:data.Email,
                        role:"speaker"
                    },"HagerMontaser5",{expiresIn:"24h"});
                })
            }
            else
            {
                token = jwt.sign({
                    _id:data._id,
                    email:data.Email,
                    role:"student"
                },"HagerMontaser5",{expiresIn:"24h"});
            }
        response.status(200).json({msg:"login",token});
        })
        .catch(error=>next(error))
    }
}
