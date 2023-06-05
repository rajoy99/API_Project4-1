const mongoose =require('mongoose')
const loginUser =require("../MongooseScema/Schemas/person/login/login.js")

var successlogged=false
const connection=require("../MongooseOperation/connectiondb.js")
let logUser=function (token){
    
    const log={
        
        token:token
            
    }
   
loginUser.logger.create(log).then(function success(m){
    console.log("successfully logged")
   
  
}).catch(function error(e){
console.log(e)
}
).finally(function stop(){
});


}
isLogin=function(token)
{
   

    const log={
        token:token

        
    }
   
loginUser.logger.find(log).then(function success(m){
    if(m){
        return true
    }
    else{
        return false
    }
}).catch(function error(e){
console.log(e)
}
).finally(function stop(){
});

}
logout=function(hash)
{  

        const log={
    hash:hash
    
    
}
    loginUser.logger.findOneAndDelete(log).then(function success(m){
        console.log("user has been deleted")

    }).catch(function error(e){
    console.log(e)
    }
    ).finally(function stop(){
    });
    
}

test=()=>{
    connection.connect()
    //logUser("kala","fuck")
  
}

module.exports={
    logout,isLogin,logUser
}