const mongoose =require('mongoose')
const  pendingBankTransactionSchema= new mongoose.Schema({
    payeeAC:String,
    supplierAC:String,
    email:String,
    
    transactionType:{type:String,default:"commercial"},
    transactionID:String,
    
    invoice:String,
    signedBy:{type:String,default:"lkjlkjlou0980808kljlkj@ldkjl"},

    amount:String,
    transactionTime:String
    

    
});

const confirmedBankTransactionSchema=new mongoose.Schema({
   
    supplierAC:String,
    email:String,
    transactionTime:String,
    transactionType:String,
    transactionIDS:[String],
    
    
    signedBy:{type:String,default:"lkjlkjlou0980808kljlkj@ldkjl"},
    amount:String

});

const pendingBankTransaction=mongoose.model("pendingBankTransaction",pendingBankTransactionSchema)
const accountbook=mongoose.model("confrimedBankTransaction",confirmedBankTransactionSchema)
module.exports={
pendingBankTransaction,accountbook
}