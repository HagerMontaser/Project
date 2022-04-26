//require express
const express = require("express");
//require body-parser
const body_parser = require("body-parser");
//require mongoose
const mongoose = require("mongoose");


//require Speaker router
const SpeakerRouter = require("./Routers/SpeakerRouter");
//require Student router
const StudentRouter = require("./Routers/StudentRouter");
//require Event router
const EventRouter = require("./Routers/EventRouter");

const AuthenRouter = require("./Routers/AuthenRouter");


//openning server
const server = express();

//connect to mongodb server
mongoose.connect("mongodb://localhost:27017/EventSysDB")
.then(()=>{
    console.log("Data base connected");
    //listenning server
    server.listen(process.env.PORT || 8080 ,()=>{
        console.log("I 'm listening .... ");
    });
})
.catch(error=>console.log("Database connection problem"))


//logger Middle Ware
server.use((request,response,next)=>{
    console.log(request.url,request.method);
    next();
});

//Body parsing middleware
server.use(body_parser.json());
server.use(body_parser.urlencoded({extended : false}));


//Routers
server.use(AuthenRouter);  //Authen router
server.use(SpeakerRouter);   //speaker router
server.use(StudentRouter);  // student router
server.use(EventRouter); // event router


//NotFound Middle Ware
server.use((request,response)=>{
    response.status(404).json({message:"Page is Not Found"});
});

//Error Middle Ware
server.use((error,request,response,next)=>{
    response.status(500).json({message: error+" "});
});