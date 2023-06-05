const { hash } = require("../Hash/hashCollection.js")
const {registerofuser}=require("../MongooseOperation/registerUser.js")
const {secretbundle}=require("../Secret/objectOfSecret")


EcommerceID=function(name,email,password,time){
    hashinput=name+secretbundle.secret.eccomersecret+email+secretbundle.secret.eccomersecret+password+secretbundle.secret.eccomersecret+time+secretbundle.secret.eccomersecret
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