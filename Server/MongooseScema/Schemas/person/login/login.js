const mongoose=require("mongoose")
const  loginSchema = new mongoose.Schema({
  token:String,
  email:String,
  password:String
  
  

});
const logger=mongoose.model('login',loginSchema);


module.exports={
  logger
}