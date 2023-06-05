const mongoose =require('mongoose')
const  invoicetotalamount= new mongoose.Schema({

    invoicenumber:String,
    totalamount:String,
   
    
   
});
const invoiceTotalamount=mongoose.model("invoiceTotalamount",invoicetotalamount)

module.exports={
invoiceTotalamount
}