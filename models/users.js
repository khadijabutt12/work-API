var mongoose=require("mongoose");
const Joi =require("@hapi/joi");
var bcrypt= require("bcryptjs");
var userSchema = mongoose.Schema({
Name:String,  
Email:String,  
Password:String,  
role:{
    type:String,
    default:"user",
}

});
userSchema.methods.generateHashedPassword= async function(){ 

    let salt =await bcrypt.genSalt(10);
   this.Password= await bcrypt.hash(this.Password,salt);
}
var User =mongoose.model("User",userSchema);
//should be inside model
function validateUser(data)
{
 const schema =Joi.object({
     Name:Joi.string().min(3).max(10).required(),
     Email:Joi.string().email().min(3).max(10).required(),
     Password:Joi.string().min(3).max(10).required(),
    

 });
 return schema.validate(data,{abortEarly: false});
}
function validateUserLogin(data)
{
 const schema =Joi.object({
     
     Email:Joi.string().email().min(3).max(10).required(),
     Password:Joi.string().min(3).max(10).required(),

 });
 return schema.validate(data,{abortEarly: false});
}
module.exports.User= User;
module.exports.validate= validateUser;//sign up
module.exports.validate= validateUserLogin;