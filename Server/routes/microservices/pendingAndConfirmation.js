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
const pendingtransaction=require("../../MongooseScema/Schemas/BankScema/BankTransactionScema")
const supplierproductadd=require("../../MongooseScema/Schemas/ProductDetails/supplier")
const voucher=require("../../MongooseScema/Schemas/voucher/voucher")
var jsonParser = bodyParser.json()
dbconnect.connect()
app.use(cors({
    origin: "*",

    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
const res = require('express/lib/response')
var http=require('http')


var server=http.createServer(function(request,response){
    url=request.url
    console.log("my url",url)
    
    response.writeHead(200,{"Content-Type":"text/json"});
    if(request.url=="/updateinvoiceconfirmation"){
   
    if(request.method=="POST")
    {  
        
       
        data=""
        request.on("data", (chunk)=>{
        data=data+chunk
        ready=(JSON.parse(data))
        console.log(ready)
        find={
          vouchernumber:ready.invoice
        }
        update={
          
          confirmation:"paid"
        }

        voucher.vouchers.findOneAndUpdate(find,update).then(async (sucess)=>{
          if(sucess){
            console.log("found and updataed ")
            
              for (i=0;i<sucess.details.length;i++){
             dquantity=parseInt(sucess.details[i].quantity)
             productId=sucess.details[i].productID 
             productadd.productforpost.findOne({productId:productId}).then((s)=>{
               if(s){
                 console.log("product",)
                 quantity=parseInt(s.available)
                 console.log("quantity",quantity,"dquantity",dquantity)
                 if(quantity>dquantity){
                 newquantity=quantity-dquantity
                 productadd.productforpost.findOneAndUpdate({productId:productId},{available:newquantity}).then((su)=>{
                   if(su){
                   console.log("successfully updated")
                   }
                 })
                 }



               }

             })






              }
          
            
            
            
        
          }
        })

        })
       // console.log(JSON.parse(data))
        request.on("end",function chunk(){

        })
        response.end()
    }
}   
    



})
server.listen(9004,"192.168.2.104")

