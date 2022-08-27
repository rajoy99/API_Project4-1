const { hash } = require("../Hash/hashCollection.js")
const {registerofuser}=require("../MongooseOperation/registerUser.js")
const {secrethub}=require("../Secret/objectOfSecret")

supplierId=function(name,email,password,time){
    hashinput=name+secrethub.secret.ecomerceSecret+email+secrethub.secret.ecomerceSecret+password+secrethub.secret.ecomerceSecret+time+secrethub.secret.ecomerceSecret
   return hash.hash(hashinput)
    

}
retrieveEcommerceID=function(name,email){

    ecomerceuser={
        name:this.name,
        email:this.email
    }
    object=registerofuser.returnEcomerce_S_User(ecomerceuser)
    return object.userID
    

}