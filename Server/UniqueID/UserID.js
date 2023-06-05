const { hash } = require("../Hash/hashCollection.js")
const {registerofuser}=require("../MongooseOperation/registerUser.js")
const {secrethub}=require("../Secret/objectOfSecret")


UserId=function(name,email,password,time,secret){
    hashinput=secrethub.secret.userSecret+name+secrethub.secret.userSecret+email+secrethub.secret.userSecret+password+secrethub.secret.userSecret+time+secrethub.secret.userSecret
   
    return  hash.hash(hashinput)

}
retrieveEcommerceID=function(name,email){

    ecomerceuser={
        name:this.name,
        email:this.email
    }
    object=registerofuser.returnEcomerce_S_User(ecomerceuser)
    return object.userID
    

}