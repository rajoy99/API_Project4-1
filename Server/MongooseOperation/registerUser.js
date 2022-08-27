const mongoose =require('mongoose')
const user =require("../MongooseScema/Schemas/person/PersonScema.js")

var success={
 sucessRegistrationEcom:false,
 sucessRegistrationGen:false,
 sucessRegistrationSup:false
}
    
registerEcomerce_SU=function (email,password){
   
    const h=require('../Hash/hashCollection.js')
    const currentTime=require("../Time/generateTime.js")
    var userid=email+password
    userid=h.hash(userid)
    const Ecomerce_SU={
        
        password:password,
        Email:email,
        Userid:userid
    }
   
user.Ecomerce_S_User.create(Ecomerce_SU).then(function success(m){
    success["sucessRegistrationSup"]=true

}).catch(function error(e){
console.log(e)
}
).finally(function stop(){

});

}
let registerGuser=function (email,password,k){
    
    const h=require('../Hash/hashCollection.js')
    const currentTime=require("../Time/generateTime.js")
   let userid=email+password
    userid=h.hash(userid)
    var users={
       
        password:password,
        Email:email,
        Userid:userid
    }
   
users.GeneralUser.create(users).then(function success(m){
    console.log("successfully inserted record")
    
    success["sucessRegistrationGen"]=true
 

}).catch(function error(e){
console.log(e)
}
).finally(function stop(){
});

}
registerSupplier=function (email,password,after){
   // mongoose.connect('mongodb://localhost:27017/kala')
    const h=require('../Hash/hashCollection.js')
    const currentTime=require("../Time/generateTime.js")
    var userid=email+password
    userid=h.hash(userid)
    const suppiler={
        
        password:password,
        Email:email,
        Userid:userid
    }
   
user.SupplierUser.create(suppiler).then(function success(m){
    
    console.log("successfully inserted record")
     
   
    
}).catch(function error(e){
console.log(e)
}
).finally(function stop(){

//mongoose.disconnect(console.log("db disconneted after doing its operation"))
});

}
let isregisteredSuplierUser=function(object){
  //  mongoose.connect('mongodb://localhost:27017/kala')
  
    user.SupplierUser.find(object).then(function success(m){
       
        if(m){
            console.log(m)
            return "t"
        }
        else return "f"

    }).catch(function error(e){
    console.log(e)
    }
    ).finally(function stop(){
    });

}
let isregisteredGUser=function({object}){
    //mongoose.connect('mongodb://localhost:27017/kala')
    user.GeneralUser.find(object).then(function success(m){
        if(m){
            console.log("successfully find the record",m)
            return true
        }
        else return false

    }).catch(function error(e){
    console.log(e)
    }
    ).finally(function stop(){
    });

}
let isregisterdEcomerce_S_User=function({object}){
  
    user.Ecomerce_S_User.find(object).then(function success(m){
        if(m){
            console.log("successfully find the record", m)
            return true
        }
        else return false

    }).catch(function error(e){
    console.log(e)
    }
    ).finally(function stop(){
    });

}
let returnSupplierUser=function({object}){
    user.SupplierUser.find(object).then(function success(m){
        if(m){
            console.log("successfully find the record",m)
            return true
        }
        else return false

    }).catch(function error(e){
    console.log(e)
    }
    ).finally(function stop(){
    });

}
let returnGUser=function({object}){
    user.GeneralUser.find({object}).then(function success(m){
        if(m){
            console.log("successfully find the record")
            return m
        }
        else return false

    }).catch(function error(e){
    console.log(e)
    }
    ).finally(function stop(){
    });

}
let returnEcomerce_S_User=function({object}){
    user.Ecomerce_SU.find(object).then(function success(m){
        if(m){
            console.log("successfully find the record")
            return true
        }
        else return false

    }).catch(function error(e){
    console.log(e)
    }
    ).finally(function stop(){
    });

}




module.exports={
    registerEcomerce_SU,registerGuser,registerSupplier,isregisterdEcomerce_S_User,isregisteredGUser,isregisteredSuplierUser,
    returnEcomerce_S_User,returnGUser,returnSupplierUser,success
}
test=()=>{
    var objg={
        name:"kala",
password:"sdfkdf"

    }
    var obje={
        name:"val",
password:"kljflsk"

    }
    var objs={
Email:'nurulhuda@gmail.com',


    }
  

    mongoose.connect('mongodb://localhost:27017/kala')
     // isregisteredSuplierUser(objs)
    // console.log(l)
  // registerEcomerce_SU("val","sal","kljflsk")
    
   // registerSupplier("val","sal","kljflsk")
   //registerGuser("vakljlkjlkjlkjljlk","sal","kljlkjl")
 // =isregisterdEcomerce_S_User(obje)
   
   // isregisteredGUser(obje)
   
}
