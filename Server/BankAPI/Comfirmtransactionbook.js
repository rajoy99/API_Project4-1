const res = require('express/lib/response')

const bankBook=require("../MongooseScema/Schemas/BankScema/BankTransactionScema")


const bodyParser=require("body-parser")
const cors=require("cors")
useraccount=require("../MongooseScema/Schemas/BankScema/useraccountdetails")
const connect=require("../MongooseOperation/connectiondb")
const giventokentotalamount=require("../MongooseScema/Schemas/BankScema/Giventokentotalamount")

const http=require("http")
const connection=require("../MongooseOperation/connectiondb")


function returnObject(m){
    console.log(m)
    kala={}
    transaction=[]
    supplerlist=[]
    
   
    tatal=[]
    var k=0;
    
    for (var  i=0; i<m.length;i++){
     
       supplierAC=m[i].supplierAC
    var amou=0

       for (var j=0;j<m.length;j++){
           
           totalamount[k]={}
          
       
     
           suppliercheck=m[j].supplierAC
           if(supplierAC==suppliercheck){

           
               kala[suppliercheck]=transaction
               transaction.push(m[j].transactionID)
               console.log("value of kala after pushing ",supplierAC,"  ",amou," ",parseInt(m[j].amount))
               amou=parseInt(amou)+parseInt(m[j].amount)
              
               
               
               





           }
           if(m.length==1){
            supplerlist.push(suppliercheck) 
           }
           if(supplierAC != suppliercheck){
              supplerlist.push(suppliercheck) 
           }
           if(j==m.length-1){
            console.log("value of amount",amou,"j vake",j)
            totalamount[k][supplierAC]=amou
            k++

        }

       }

    }
   
    return [kala,supplerlist,totalamount]


}
async function returnCompletionSignal(supplierlist,transactionObject,totalamount,invoice){
    for (i=0;i<supplierlist.length;i++){
        obj={
            supplierAC:supplierlist[i]

            
        }
      await  bankBook.accountbook.findOne(obj).then((success)=>{
            if(success){
                updatedtransaction=[]

               updatedtransaction= success.transactionIDS
               console.log(updatedtransaction)
               console.log("me before ",transactionObject[supplierlist[i]])
            updatedtransaction= updatedtransaction.concat(transactionObject[supplierlist[i]])
            console.log("Me as undefined",updatedtransaction)
                
                   a= totalamount[0]
                   amoun=a[supplierlist[i]]

                   console.log("i am reching",amoun)
                console.log(success)
                
                updateamount=parseInt(success.amount)+parseInt(amoun)
                console.log(updateamount)
               
                find={
                    supplierAC:success.supplerAC
                }
                objforupdate={
                    supplierAC:success.supplerAC,
                   
                    
                   
                    transactionIDS:updatedtransaction,
                    
                    
                    amount:updateamount
                
                }
            
          bankBook.accountbook.findOneAndUpdate(find,objforupdate).then((s)=>
                {
                    if(s){
                     log.console("succesfully updated")
                       
                    }
                })
              

            
            }
            else{
                
                transaction=[]
                transaction=transactionObject[supplierlist[i]]
                a= totalamount[i]
             
                console.log("i am reching",a)
                console.log("kjhkj",supplierlist[i])
              
                amoun=totalamount[i][supplierlist[i]]


                console.log("i am reching",amoun)
                jala=String(supplierlist[i])
                if(supplierlist[i]==jala){
                    console.log("that fuck so long")
                }
                console.log("i am reching khjujhkj",totalamount[i][jala])
          
             
             updateamount=parseInt(amoun)

                obj={
                supplierAC:supplierlist[i],
            
               
                transactionType:"Commercial",
                transactionIDS:transaction,
                amount:updateamount
                
                
              
                }
                bankBook.accountbook.create(obj).then((s)=>{
                    if(s){
                        console.log("updated in account book ")
                    }
                })
                

            }
        })
    }

   await bankBook.pendingBankTransaction.find({invoice:invoice}).then((success)=>{
       if(success)
{
    for( i in success){
        obj={
            _id:success[i]._id
        }
        bankBook.pendingBankTransaction.findOneAndDelete(obj).then((sucess)=>{
            if(sucess)
            console.log("succesfully deleted")
        })
    }

}

   })
  

}


var server=http.createServer(async function(request,response){
    url=request.url
    console.log("my url",url)
    await connection.connectBank()
    
    response.writeHead(200,{"Content-Type":"text/json"});
    if(request.url=="/bank/confirm/vouchers")
    {
        
    
            if(request.method=="POST"){
                connect.connect()
                       
                data=""
                request.on("data", (chunk)=>{
                data=data+chunk
                console.log(JSON.parse(data))
                })
               
               // console.log(JSON.parse(data))
                request.on("end",function chunk(){
                    idetail=JSON.parse(data)
                    console.log(idetail)
                    finding={
                        invoice:idetail.invoice
                    }
                    bankBook.pendingBankTransaction.find(finding).then((success)=>{
                        if(success){
                            transactionObject={}
                            supllierlist=[]
                            totalamount={}

                           returned=returnObject(success)
                           console.log(returned[0],returned[1],returned[2])
                          
                            mala=returnCompletionSignal(returned[1],returned[0],returned[2],success.invoice)
   
                        }
            
                    })
        
                })
                response.end()
                  
            }
            
                    
            
            
    }
   
})





   
    




server.listen(9007,"192.168.2.104")