const express=require("express");

const router=express.Router();
const controller=require("./../Controllers/AuthenController")


router.post("/login",controller.login);
module.exports=router;