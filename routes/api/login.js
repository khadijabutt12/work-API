//to create router ,api related routes are handeled

const express = require("express");
let router = express.Router();
var Login= require("../../models/login");

router.get("/",async(req,res)=> {
    let logins = await Login.find();
    return res.send(logins);


});
module.exports= router;

