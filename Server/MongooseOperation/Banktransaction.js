const mongoose =require('mongoose')
const bankTransaction =require("../MongooseScema/Schemas/BankScema/BankTransactionScema.js")


//mongoose.connect('mongodb://localhost:27017/kala')
    
registerPendingTransaction=function (payeeID,recieverID,email,transactionTime,transactionType,transactionID,confrim){
    const h=require('../Hash/hashCollection')
    const currentTime=require("../Time/generateTime.js")
    transactionIDhash=payeeID+recieverID+email+transactionTime+transactionType+confrim
    transactionID=h.hash(transactionIDhash)
    
    pendingBankTransactionSchema= {
        payeeID:this.payeeID,
        recieverID:this.recieverID,
        email:this.email,
        transactionTime:this.transactionTime,
        transactionType:this.transactionType,
        transactionID:this.transactionID,
        confrim:this.confrim,
        
    }
   
bankTransaction.pendingBankTransaction.create(Ecomerce_SU).then(function success(m){
    console.log("successfully inserted record")
}).catch(function error(e){
console.log(e)
}
).finally(function stop(){
//mongoose.disconnect(console.log("db disconneted after doing its operation"))
});

}

registerConfirmedTransaction=function (payeeID,recieverID,email,transactionTime,transactionType,transactionID,signedBY){
    const h=require('../Hash/hashForUserId.js')
    const currentTime=require("../Time/generateTime.js")
    
    
    pendingBankTransactionSchema= {
        payeeID:payeeID,
        recieverID:recieverID,
        email:email,
        transactionTime:transactionTime,
        transactionType:transactionType,
        transactionID:transactionID,
        signedBy:signedBY
        
    }
   
bankTransaction.confirmedBankTransaction.create(Ecomerce_SU).then(function success(m){
    console.log("successfully inserted record")
}).catch(function error(e){
console.log(e)
}
).finally(function stop(){
//mongoose.disconnect(console.log("db disconneted after doing its operation"))
});

}