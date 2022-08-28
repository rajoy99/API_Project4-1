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
const pendingBankTransaction=require("../../MongooseScema/Schemas/ProductDetails/productScema")
const voucher=require("../../MongooseScema/Schemas/voucher/voucher")
const suplierdetail=require("../../MongooseScema/Schemas/person/PersonScema")
const http=require("http")
const supplierproductadd=require("../../MongooseScema/Schemas/ProductDetails/supplier")
const { send } = require('express/lib/response')
dbconnect.connect()

var jsonParser = bodyParser.json()
app.use(cors({
    origin: "*",

    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.post('/userOrder/pending',jsonParser,(req,res)=>{
    console.log(req.body)
    payeeid=req.body.payeeID
    finding={
        payeeID:payeeid,
        confirmation:"paid"
    }
    voucher.vouchers.find(finding).then((s)=>{
        if(s){
            res.send(s)
        }
    })



    })
app.post("/user/orderRecieved",jsonParser,(req,res)=>{
    console.log("invoicechoosed",req.body)
    var invoicenumbe=req.body.invoicenumber
    finding={
        vouchernumber:invoicenumbe,
        
    }

    update={
        confirmation:"recieved"
    }
    voucher.vouchers.findOneAndUpdate(finding,update).then((s)=>{
        if(s){
            bankneeded={
                invoice:invoicenumbe,
                bankTransactionConfirm:"true"
            }
            const transactionlis = JSON.stringify(bankneeded);
            console.log(transactionlis)
            const options = {
                hostname: '192.168.2.104',
                port: 9007,
                path: '/bank/confirm/vouchers',
                method: 'POST',
                headers: {
                'Content-Type': 'text/json',
                'Content-Length': transactionlis.length,
                },
            };
            
            const req = http.request(options, res => {
                console.log('statusCode: ${res.statusCode}');
            
                res.on('data', d => {
                process.stdout.write(d);
                });
            });
            
            req.on('error', error => {
                console.error(error);
            });
            
            req.write(transactionlis);
            req.end();
        }
    })
    
})
app.listen(9006,"192.168.2.104")