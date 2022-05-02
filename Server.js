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

//Allow CORS
// server.use((request,response,next)=>{

//     response.header("Access-Control-Allow-Origin","*");
//     response.header("Access-Control-Allow-Methods","GET,POST,DELETE,PUT,OPTIONS");
//     response.header("Access-Control-Allow-Headers","Content-Type,Authorization")
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();

// })

server.use(function(req, res, next) {
    var oneof = false;
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if(req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if(oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }

    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
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