const res = require('express/lib/response')
var http=require('http')
var hash=require("../Hash/hashCollection")
var pendingbankTransaction=require("../MongooseScema/Schemas/BankScema/BankTransactionScema")
var time=require("../Time/generateTime")
const express = require('express')
const app = express()
var dbconnect=require("../MongooseOperation/connectiondb")
dbconnect.connectBank()
const giventokentotalamount=require("../MongooseScema/Schemas/BankScema/Giventokentotalamount")


var server=http.createServer(function(request,response){
    url=request.url
    console.log("my url",url)
    
    response.writeHead(200,{"Content-Type":"text/json"});
    if(request.url=="/transactionforprocessing"){
    if(request.method=="GET"){

    }
   
    if(request.method=="POST")
    {   console.log("fuck you leave me alone")
        
        
        data=""
        request.on("data", (chunk)=>{
        data=data+chunk
        console.log("kaka i will be send",data)
        datafromecommerce=JSON.parse(data)
        totalnumberofsupplier=datafromecommerce.supplierlist.length
        totalamount=0
        for(j=0;j<totalnumberofsupplier;j++){
            totalamount=parseInt(totalamount)+parseInt(datafromecommerce.supplierlist[j].amount)
        }
        
        totalagainstinvoice={
            invoicenumber:datafromecommerce.invoicenumber,
    
            totalamount:totalamount
        }
        giventokentotalamount.invoiceTotalamount.create(totalagainstinvoice).then((success)=>{
            if(success){
                console.log("invoiceTotalamount is saved")
                
            }

        })
        for (i=0 ;i< totalnumberofsupplier;i++){
         transactionID=hash.hash(data+time.currentTime()+"kabikabigum")
         currentTime=time.currentTime()
         pendingbankdata={
            
           
            supplierAC:datafromecommerce.supplierlist[i].supplierID,
            
            
            
           
            transactionID:transactionID,
            
            invoice:datafromecommerce.invoicenumber,
            
            transactionTime:currentTime,
            amount:datafromecommerce.supplierlist[i].amount
           }
           
        
        pendingbankTransaction.quequefortransaction.create(pendingbankdata).then((e)=>{
            if (e)
            {
                console.log("succesfully quequed")

            }
        })

    }

        })
       // console.log(JSON.parse(data))
        request.on("end",function chunk(){

        })
        response.end()
    }
}   



// here we go with the user details


    



})
server.listen(9000,"192.168.2.104")
