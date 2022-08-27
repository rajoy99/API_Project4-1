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

var jsonParser = bodyParser.json()
app.use(cors({
    origin: "*",

    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.post('/giventoken/validity/feed',jsonParser,(req,res)=>{
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
        productadd.productforpost.find({available
            :{$gt:0}}).then(function succes(m){
            console.log(m)
            res.send(m)
        
            
        }).catch(function error(e){
            console.log(e)
        });
        
        
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
app.post('/giventoken/validity/userdetails',jsonParser,(req,res)=>{
    console.log("welcome",req.url)
    dbconnect.connect()
    console.log(req.body)

  let token = req.body["cookstring"]
  console.log(token)
 // let usertype=req.body["user"]
  let email=req.body["email"]
  log = {
      token:token
    }
  userdetails = {
      Email:email
  }

  loginUser.logger.find(log).then(function success(m){
    if(m.length){
        console.log("token is",m)
        users.GeneralUser.findOne(userdetails).then(function succes(m){
            console.log(m)
            res.send(m)
        
            
        }).catch(function error(e){
            console.log(e)
        });
        
        
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

app.post('/giventoken/validity/available',jsonParser,(req,res)=>{
    console.log("welcome",req.url)
    console.log("list of product",req.body)
    dbconnect.connect()
    let size = req.body.cartState.length
    let invoice;
    let i=0;
   let  price = 0;
    let available =[];
    let detalsforvoucher = []
    
    let objectforvoucheri={}
    

   
    let result={}
async function kala(){
    let k = 0;
   let objectforvoucher=[]
  for ( i = 0;i<size;i++)
  {
      objectforvoucher[i] = {}
     let  productid=req.body.cartState[i].prodID
     console.log("product id",productid)
      
   
   
   
     let details = {
        productId:productid,
        available:{$gt:0}

                }
      
           
       
        let promiseforavail = Promise.resolve( productadd.productforpost.findOne(details).then( function succes(m){
            if(m) {
                return m
            }
            else{
                return false
            }
        }))
        avaiableproduct=await promiseforavail

    
     

            console.log("productforavailable",avaiableproduct)

            
            available.push(avaiableproduct.productName)
            objectforvoucher[i].productID = avaiableproduct.productId;
            objectforvoucher[i].supplierID = avaiableproduct.supplierId;

            
              let tprice      
                    let quantityforsupplier = 0;
                    for(g in req.body.cartState){
                       tprice=0
                        if(objectforvoucher[i].productID == req.body.cartState[g].prodID){
                            quantityforsupplier = req.body.cartState[g].quantity;
                            console.log("quantityforsupplier ",quantityforsupplier)
                            tprice=parseInt(avaiableproduct.price)*parseInt(quantityforsupplier);

                            break;
                        }
                    }
            price=tprice+price
            objectforvoucher[i].quantity = quantityforsupplier;
            objectforvoucher[i].price = tprice
            console.log("voucher for object",objectforvoucher[i])
            objectforvoucher[i]=objectforvoucher[i]
            detalsforvoucher.push(objectforvoucher[i])
            console.log("deatialvoucher from outside",detalsforvoucher)
            console.log("available product",available)
            
            
            k++;
        
            if(k == size)
            {   console.log("deatialvoucher",detalsforvoucher)
                
                console.log("my number is",k)
                for (avail in available)
                invoice = avail+avail+time.currentTime()
                invoice = hashingstuff.hash(invoice)
                invoice=invoice
               

var vouchersi = {
    payeeID:req.body.userid ,
    vouchernumber:invoice,
    details:detalsforvoucher,
    pricetotal:price
    

    }


    voucher.vouchers.create(vouchersi).then(function k(m){
        if(m)
        {
            res.send({available,price,invoice})
        }
    })


               
                
                
                
                    
                
                   



                
                
            
          
                

                


            }
       
        
        
    

        }
            
                
    
            
        
         


            
        console.log("logger tell",available,price,invoice)
        
            

    }

    
    kala()
    
    
});



            

        
   
  



app.post('/giveninvoice/confirm',jsonParser,(req,res)=>{
    let invoicenumber=String(req.body.invoice)
    console.log("log kjklk",invoicenumber)

    
    

    let transactionpair=[]
    let transactionlist=[]
    let bankneeded={}
    let k=0
    con={
        vouchernumber:invoicenumber
    }
    update={
        confrimation:"pending"
    }
    voucher.vouchers.findOneAndUpdate(con,update).then(function succes(m){
       if(m){
          
        let k=0;

           for (var i=0;i<m.details.length;i++)
           {transactionpair[i]={}
            transactionpair[i].supplierID=m.details[i].supplierID
            transactionpair[i].amount=m.details[i].price
            transactionlist.push(transactionpair[i])
            
            k++;
            if(k==m.details.length){
           
            bankneeded.PayeeAC=m.payeeID
            bankneeded.supplierlist=transactionlist
            bankneeded.totalprice=m.totalprice
            bankneeded.invoicenumber=invoicenumber
            const transactionlis = JSON.stringify(bankneeded);
            console.log(transactionlis)
                        
                            const options = {
                                hostname: '192.168.2.104',
                                port: 9000,
                                path: '/transactionforprocessing',
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


           }

        

              


       }
       })
    
    
               
                                       
    })                                       
                                        
                                        
         
                                        
                            
                                    
                                
                        
                               
                

                    
            
        
           
        
            
        
    





            

            
            
            

        


        



    

   
   






   


app.listen(3006,"192.168.2.104", () => {
  console.log(`Example app listening on port 3006`)
})