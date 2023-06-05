const mongoose =require('mongoose')
const productforpost=require("../MongooseScema/Schemas/ProductDetails/productScema.js")
const connection=require("./connectiondb")


var productadded=false
    
addingProduct=function (productName,productId,productdetail,supplierId,quantity){
    const h=require('../Hash/hashCollection')
    const currentTime=require("../Time/generateTime.js")
    
   let product= {
        productName:productName,
        productId:productId,
        Productdetail:productdetail,
        quantity:quantity,
        
        supplierId:supplierId
    }
   
productforpost.productforpost.create(product).then(function success(m){
    productadded=true
    console.log("successfully inserted product")
}).catch(function error(e){
console.log(e)
}
).finally(function stop(){
//mongoose.disconnect(console.log("db disconneted after doing its operation"))
});

}
findDocumentFromProductCollection=function(object){
  //  mongoose.connect('mongodb://localhost:27017/kala')
    productforpost.productforpost.find(object).hen(function success(m){
        console.log("successfully inserted record")
    }).catch(function error(e){
    console.log(e)
    }
    ).finally(function stop(){
   // mongoose.disconnect(console.log("db disconneted after doing its operation"))
    });

}
findAndUpdateFromProductCollection=function(object,update){
   // mongoose.connect('mongodb://localhost:27017/kala')
    productforpost.productforpost.findOneAndUpdate(object,update).hen(function success(m){
        if(m){
        console.log("successfully updated record")
        }
        else
        {
            console.log("could not find the record in the document")
        }
    }).catch(function error(e){
    console.log(e)
    }
    ).finally(function stop(){
   // mongoose.disconnect(console.log("db disconneted after doing its operation"))
    });

}
module.exports={
    findAndUpdateFromProductCollection,findDocumentFromProductCollection,addingProduct
}
test=()=>{
    connection.connect()
    addingProduct("kalal","jalal","klajlkaj","klkjl","kljlkj","ljkljlk")

}
test()


