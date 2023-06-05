const res = require('express/lib/response')
var http=require('http')
const bankbook=require("../MongooseScema/Schemas/BankScema/BankTransactionScema")
const connection=require("../MongooseOperation/connectiondb")
connection.connectBank()

var server=http.createServer(function(request,response){
    url=request.url
    console.log("my url",url)
    
    response.writeHead(200,{"Content-Type":"text/json"});
    if(request.url=="/newAccount"){
   
    if(request.method=="POST")
    {   
       
        data=""
        request.on("data", (chunk)=>{
        data=data+chunk
       

        })
       // console.log(JSON.parse(data))
        request.on("end",function chunk(){
            console.log(data)
            suppiler=JSON.parse(data)
    supplier={
        supplierAC:suppiler.supplierAC
    }
     bankbook.supplieraccounts.create(supplier).then((sucess)=>{
         if(sucess){
             console.log("supplier id has been added")

         }
     })

        })
        response.end()
    }
}   
    



})
server.listen(9009)
