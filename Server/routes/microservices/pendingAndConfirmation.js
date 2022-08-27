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
          
          confirmation:"yes"
        }
        voucher.vouchers.findOneAndUpdate(find,update).then((sucess)=>{
          if(sucess){

            console.log("succesfully update",sucess)
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
server.listen(9004)

