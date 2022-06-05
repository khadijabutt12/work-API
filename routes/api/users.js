//to create router ,api related routes are handeled

const express = require("express");
let router = express.Router();
var {User}= require("../../models/users");
var bcrypt =require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config =require("config");


router.post("/register",async(req,res)=> {
    let user = await User.findOne({Email: req.body.Email});//check
    if(user)

    
    
    return res.status(400).send("user with same email id already exists");
    
    user = new User();
    user.Name=req.body.Name;
    user.Email=req.body.Email;
    user.Password=req.body.Password;
   await user.generateHashedPassword();//shifted to model
    await user.save();
    return res.send(_.pick(user,["Name","Email"]));// as we want to give in response only these two



});
//we will recieve a token
router.post("/login",async(req,res)=> {
    let user = await User.findOne({Email: req.body.Email});//check
    if(!user)
    
    return res.status(400).send("user not exists");
    let isValid = await bcrypt.compare(req.body.Password,user.Password);
    if(!isValid)
    return res.status(400).send("Password is incorrect");
    let token =jwt.sign({_id:user._id,Name:user.Name},config.get("jwtPrivateKey"));
    return res.send(token);




});
module.exports= router;

