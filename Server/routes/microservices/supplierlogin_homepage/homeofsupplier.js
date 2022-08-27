const express = require('express')
const app = express()
const bodyParser=require("body-parser")
const port = 3001
const hashingstuff=require('../../Hash/hashCollection.js')
//const registerstaff=require('../../MongooseOperation/registerUser.js')
//const login=require('../../MongooseOperation/login.js')
const time=require("../../Time/generateTime")
const urlobject=require("./urlcraft/urldecode")
const cors=require("cors")
const users=require("../../MongooseScema/Schemas/person/PersonScema")
const { connection } = require('mongoose')
const dbconnect=require("../../MongooseOperation/connectiondb")
const loginUser=require("../../MongooseScema/Schemas/person/login/login")
const productadd=require("../../MongooseScema/Schemas/ProductDetails/productScema")
const supplierproductadd=require("../../MongooseScema/Schemas/ProductDetails/supplier")
var jsonParser = bodyParser.json()
app.use(cors({
    origin: "*",

    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.post('/giventoken/validity',jsonParser,(req,res)=>{
    console.log("welcome",req.url)
    dbconnect.connect()
    console.log(req.body)
  let token=req.body["cookstring"]
  console.log(token)
  let usertype=req.body["user"]
  log={
      token:token
  }

  loginUser.logger.find(log).then(function success(m){
    if(m.length){
        console.log("token is",m)
        res.send({valid:true})
    }
    else{
        console.log("token is",m)
        res.send({valid:false})
    }
}).catch(function error(e){
console.log(e)
}
).finally(function stop(){
});


})
app.post('/giventoken/userdetail',jsonParser, (req, res) => {
    
  
dbconnect.connect()
console.log(req.url)

console.log("i am in ",req.body)
  


  
  let emaily=req.body["email"]

  console.log("tomar email",emaily)
  let password=req.body["password"]
  let usertype=req.body["user"]
  

  
  var usercredentailin={
    

    
                     }
usercredentailin["Email"]=emaily
  
   
    if(usertype=="Suser"){

     
     
       
        console.log("S_user is asking for userdetail of supplier ")
          users.SupplierUser.findOne(usercredentailin,function success(err,docs){
             
              if(err){
                console.log("error happened")
                res.send({massage:"Error_occured"})
                  //console.log(m)
                 
              }
              else 
              {
                  console.log("matched document",docs)
              res.send(docs)
              }
      
          });
         
      
    
    }
   
    
    
    
   
    
    
  
})
app.post('/login/giventoken/product_add',jsonParser,(req,res)=>{
  dbconnect.connect()

  console.log(req.body)
 
  console.log("name of the cokkie",req.body)
  
  let price=req.body["price"]
  let email=req.body["email"]
  let productname=req.body["name"]
  let productId=email+"fuckhead"+productname+"skljklj"
    productId=hashingstuff.hash(productId)
  let productdetail=req.body["description"]
  let available=req.body["quantity"]
  let supplierId=req.body["id"]
  
  
  
  productaddtosupplier={
    productName:productname,
    productId:productId,
    Productdetail:productdetail,
    total:available,
    supplierId:supplierId,
    price:price
   
   
    
}

productaddtoproductlist={
   
    productName:productname,
    productId:productId,
    Productdetail:productdetail,
    available:available,
    supplierId:supplierId,
    price:price

}


productadd.productforpost.create(productaddtoproductlist).then(function success(m){
    console.log(m)
    
        
       
   


}).catch(function error(e){
console.log(e)
}
).finally(function stop(){
});
supplierproductadd.supplierproduct.create(productaddtosupplier).then(function succes(m){
    console.log(m)
    

    
}).catch(function error(e){
    console.log(e)
});

  
})


app.post('/supplierproducts/details',jsonParser, (req, res) => {
    
    dbconnect.connect()

  console.log("i am from the supplierproducts details",req.body)
  supplierid=req.body["id"]
  console.log(supplierid)
  let supply={supplierId:supplierid
}
  supplierproductadd.supplierproduct.find(supply).then(function succes(m){
    console.log(m)
    res.send(m)

    
}).catch(function error(e){
    console.log(e)
});


 
})

app.post('/supplierproducts/watch',jsonParser, (req, res) => {
    productpending={
   
        productName:productname,
        productId:productId,
        Productdetail:productdetail,
        total:available,
        supplierId:supplierId,
        pending:pending,
        price:price
    
    }
   
    
    dbconnect.connect()

  console.log("i am from the supplierproducts details",req.body)
  supplierid=req.body["id"]
  console.log(supplierid)
  let supply={supplierId:supplierid
}
  supplierproductadd.supplierproduct.find(supply).then(function succes(m){
    console.log(m)
    res.send(m)

    
}).catch(function error(e){
    console.log(e)
});


 
})



app.listen(3003,"192.168.2.104", () => {
  console.log(`Example app listening on port 3003`)
})