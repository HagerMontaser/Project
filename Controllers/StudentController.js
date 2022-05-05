//require express-validator  
const {validationResult}=require("express-validator");

//require bcrypt
const bcrypt = require("bcryptjs")

//require student model
const Student = require("./../Models/StudentModel");

//require speaker model
const Event = require("./../Models/EventModel");

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


//Get all students method
module.exports.GetAllStudents = (request,response,next)=>{
    
    if(request.role === "admin")
    {
        Student.find({})
        .then((data)=>{
            response.status(200).json(data);
        })
        .catch((error) => {
            next(error);
        })
    }
    else if(request.role === "student")
    {
        Student.findOne({_id:request._id})
        .then((data)=>{
            //send json data of choosen speaker to front ent
            response.status(200).json(data);
        })
        .catch(error => {
            next(error);
        })
    }
    else
    {
        throw new Error("Not Authorized");
    }
   
}

//Get student by ID
module.exports.GetStudentById = (request,response,next)=>{
    
    if(request.role !== "admin")
    {
        throw new Error("Not Authorized");
    }

    checkValid(request);
    
    //find student when its id == id of request
    Student.findOne({_id:request.params._id})
    .then((data)=>{
        //send json data of choosen student to front ent
        response.status(200).json(data);
    })
    .catch(error => {
        next(error);
    })
}


//Update Student
module.exports.UpdateStudent = (request,response,next)=>{

    //Check data valid or not
    checkValid(request);

    //check if role is an admin
    if(request.role === "admin")
    {
        //update student by id
        Student.updateOne({_id:request.body._id},{
            $set:{
                email:request.body.email
            }
        })
        .then(data => {
            //if student is not found in database.
            if(data.matchedCount == 0)
                throw new Error("Student not exist");
            
            response.status(200).json({msg:"Student updated"});
        })
        .catch(error => next(error))
    }
    //check if role is a student
    else if(request.role === "student")
    {
        bcrypt.hash(request.body.password, 10).then(async (hash) =>{
        //update student by id
            Student.updateOne({_id:request._id},{
                $set:{
                    email:request.body.email,
                    password:hash
                }
            })
            .then(data => {
                //if student is not found in database.
                if(data.matchedCount == 0)
                    throw new Error("Student not exist");
                
                response.status(200).json({msg:"Student updated"});
            })
            .catch(error => next(error))
        })
    }
    else
    {
        throw new Error("Not Authorized");
    }
}

//Delete Student
module.exports.DeleteStudent = (request,response,next)=>{

    //Check data valid or not
    checkValid(request);
    
    //check if user is an admin
    if(request.role !== "admin")
    {
        throw new Error("Not Authorized");
    }
    //delete student
    Student.findOneAndDelete({_id:request.params._id})
    .then(data => {
        if (data ==null)
        {
            throw new Error("Student not exist");
        }
        RefreshEvent(request.params._id);
        response.status(200).json({msg :"student deleted"});

    })
    .catch(error=>next(error))
}

//refresh event
function RefreshEvent(id){
    
    Event.find({Students:id})
    .then(events=>{
            if(events!=null){
                Event.updateMany({Students:id},{
                    $pull:{
                        Students:id
                    }
                }).then(data=>{
                        //console.log(data);
                })
            }
        }
    )

}