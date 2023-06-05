
const crypto =  require('crypto');

hash= function(input){
   
   const h=crypto.createHash('sha256');
   
   let digest=h.update(input).digest("base64")
   return digest
}

module.exports={
    hash
}