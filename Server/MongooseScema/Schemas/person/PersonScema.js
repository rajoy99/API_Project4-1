const mongoose =require('mongoose')

const  guserSchema= new mongoose.Schema({
    
    password:String,
    Email:String,
    Userid:String


});
const  SupplierSchema= new mongoose.Schema({
   
    password:String,
    Email:String,
    Userid:String


});
const  Ecomerce_SU_Schema= new mongoose.Schema({
  
    password:String,
    Email:String,
    Userid:String

});
const GeneralUser=mongoose.model('generalUser',guserSchema);

const SupplierUser=mongoose.model('Supplierlist',SupplierSchema);
const Ecomerce_S_User=mongoose.model('Ecomerce_S_User',Ecomerce_SU_Schema)
module.exports={
    GeneralUser,SupplierUser,Ecomerce_S_User
}