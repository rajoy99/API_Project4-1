const mongoose =require('mongoose')
const supplierStock =require("../MongooseScema/Schemas/ProductDetails/supplier.js")
const connection=require("./connectiondb")


var addedginsupplierdocument=false
    
addingsupplierdocument=function (productName,productId,productdetail,total,pending,supplierId){
  //  mongoose.connect('mongodb://localhost:27017/kala')
    const h=require('../Hash/hashCollection')
    const currentTime=require("../Time/generateTime.js")
    
    let supplierproductentry= {
        productName:productName,
        productId:productId,
        Productdetail:productdetail,
        total:total,
        pending:pending,
        
        supplierId:supplierId,
    }
   
supplierStock.supplierproduct.create(supplierproductentry).then(function success(m){
    console.log("successfully inserted record")
    addedginsupplierdocument=true
}).catch(function error(e){
console.log(e)
}
).finally(function stop(){
//mongoose.disconnect(console.log("db disconneted after doing its operation"))
});

}

returnproductID=function(object){
   
    supplierStock.supplierproduct.find(object).then(function success(m){
        if(m){
            return m[productId]

        }
        
    }).catch(function error(e){
    console.log(e)
    }
    ).finally(function stop(){
   // mongoose.disconnect(console.log("db disconneted after doing its operation"))
    });

}
findAndUpdateFromSupplierCollection=function(object,update){
   // mongoose.connect('mongodb://localhost:27017/kala')
    supplierStock.supplierproduct.findOneAndUpdate(object,update).hen(function success(m){
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
  //  mongoose.disconnect(console.log("db disconneted after doing its operation"))
    });

}
module.exports={
    findAndUpdateFromSupplierCollection,returnproductID,addinginsupplierdocument
}
test=()=>{
    connection.connect()
    addinginsupplierdocument("kkjhkjh","adfs","lkjlk","lkjlkj","lkjljlj")
}
test()

