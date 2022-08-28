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
const  queueSchema= new mongoose.Schema({
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
    amount:{type:String,default:"0"}

});
const supplierBankAccount=new mongoose.Schema({
   
    supplierAC:String,
    
    
   
    
    
    
    signedBy:{type:String,default:"lkjlkjlou0980808kljlkj@ldkjl"},
    amount:String

});

const pendingBankTransaction=mongoose.model("pendingBankTransaction",pendingBankTransactionSchema)
const accountbook=mongoose.model("confrimedBankTransaction",confirmedBankTransactionSchema)
const supplieraccounts=mongoose.model("Suppiler_Bank_ACCOUNT",supplierBankAccount)
const quequefortransaction=mongoose.model("quequefortransaction",queueSchema)
module.exports={
pendingBankTransaction,accountbook,supplieraccounts,quequefortransaction
}