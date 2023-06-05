const { hash } = require("../Hash/hashCollection.js")
const {secretbundle}=require("../Secret/objectOfSecret")
const {registerforproduct}=require("../MongooseOperation/allProduct")


productID=function(name,productId,suppilerId,time){
    hashinput=name+secretbundle.secret.productSecret+productId+secretbundle.secret.productSecret+suppilerId+secretbundle.secret.productId+time+secretbundle.secret.productSecret
    return hash.hash(hashinput)


}
retrieveproductID=function(){

    ecomerceuser={
        name:this.name,
        email:this.email
    }
    object=registerofuser.returnEcomerce_S_User(ecomerceuser)
    return object.userID


}