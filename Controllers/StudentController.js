//require express-validator  
const {validationResult}=require("express-validator");

//require student model
const Student = require("./../Models/StudentModel");


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
    
    if(request.role !== "admin")
    {
        throw new Error("Not Authorized");
    }

    Student.find({})
    .then((data)=>{
        response.status(200).json({data});
    })
    .catch((error) => {
        next(error);
    })
}

//Get student by ID
module.exports.GetStudentById = (request,response,next)=>{
    
    if(request.role !== "admin")
    {
        throw new Error("Not Authorized");
    }

    checkValid(request);
    
    //find student when its id == id of request
    Student.find({_id:request.params.id})
    .then((data)=>{
        //send json data of choosen student to front ent
        response.status(200).json({data});
    })
    .catch(error => {
        next(error);
    })
}

//create student
module.exports.CreateStudent = (request,response,next)=>{
    
    //Check data valid or not
    checkValid(request);

    //if data is valid create new student in database
    let student = new Student({
        _id: request.body.id,
        Email:request.body.email,
        Password:request.body.password
    });

    //save in database
    student.save()
    .then((data)=>{
        response.status(201).json({message:"Student created",data})
    })
    .catch(error=>next(error))
}

//Update Student
module.exports.UpdateStudent = (request,response,next)=>{

    //Check data valid or not
    checkValid(request);

    //check if role is an admin
    if(request.role === "admin")
    {
        //update student by id
        Student.updateOne({_id:request.body.id},{
            $set:{
                Email:request.body.email
            }
        })
        .then(data => {
            //if student is not found in database.
            if(data.matchedCount == 0)
                throw new Error("Student not exist");
            
            response.status(200).json({message:"Student updated",data});
        })
        .catch(error => next(error))
    }
    //check if role is a student
    else if(request.role === "student")
    {
        //update student by id
        Student.updateOne({_id:request._id},{
            $set:{
                Email:request.body.email,
                Password:request.body.password
            }
        })
        .then(data => {
            //if student is not found in database.
            if(data.matchedCount == 0)
                throw new Error("Student not exist");
            
            response.status(200).json({message:"Student updated",data});
        })
        .catch(error => next(error))
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
    Student.findOneAndDelete({_id:request.body.id})
    .then(data => {
        if (data ==null)
        {
            throw new Error("Student not exist");
        }
        response.status(200).json({message :"student deleted"});

    })
    .catch(error=>next(error))
}