
const crypto =  require('crypto');

 gen_Trans_Num = function( secret,time,payeeid,recieverid,transactiontype){
    
    const hash=crypto.createHash('sha256');
    var input=secret+time+payeeid+recieverid+transactiontype
    let digest=hash.update(input).digest("base64")
    return digest
}
module.exports= gen_Trans_Num
let test=gen_Trans_Num("jak","23","kkaala","jkhkjhk","business")
console.log(test)