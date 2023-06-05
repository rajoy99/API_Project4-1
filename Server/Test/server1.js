const res = require('express/lib/response')
var http=require('http')


var server=http.createServer(function(request,response){
    url=request.url
    console.log("my url",url)
    
    response.writeHead(200,{"Content-Type":"text/json"});
    if(request.url=="/transactionforprocessing"){
    if(request.method=="GET")
    {   console.log("sending fuck you ")
        response.end("fuck")
    }
    if(request.method=="POST")
    {   console.log("fuck you leave me alone")
        
       
        data=""
        request.on("data", (chunk)=>{
        data=data+chunk
        console.log(JSON.parse(data))

        })
       // console.log(JSON.parse(data))
        request.on("end",function chunk(){

        })
        response.end()
    }
}   
    



})
server.listen(9000)
