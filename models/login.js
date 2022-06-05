var mongoose=require("mongoose");
var loginSchema = mongoose.Schema({
    Name:String,
    Password: String,    
   
   });
   var Login =mongoose.model("Login",loginSchema);
   module.exports=Login;