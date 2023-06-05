const mongoose =require('mongoose')


const  userbankcredential= new mongoose.Schema({

    bankaccnumber:String,
    
    banksecret:String,
    amount:String
   
});
const bankcredential=mongoose.model("bankaccountdetails",userbankcredential)

module.exports={
bankcredential
}