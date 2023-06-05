const express = require('express')
const app = express()
const bodyParser=require("body-parser")
const cors=require("cors")
useraccount=require("../MongooseScema/Schemas/BankScema/useraccountdetails")
const connect=require("../MongooseOperation/connectiondb")
const giventokentotalamount=require("../MongooseScema/Schemas/BankScema/Giventokentotalamount")
connect.connectBank()
const http=require("http")
time=require("../Time/generateTime")
const bankbook=require("../MongooseScema/Schemas/BankScema/BankTransactionScema")
hash=require("../Hash/hashCollection")

var jsonParser = bodyParser.json()
app.use(cors({
    origin: "*",

    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.post('/bank/Customerdata',jsonParser,async (req,res)=>{
 console.log(req.body)

find={
    bankaccnumber:req.body.bankaccnumber
}
useraccount.bankcredential.findOne(find).then((sucess)=>{
    if(sucess){
    console.log("me as a sucess",sucess,typeof(sucess))
    console.log("kala i ma",sucess.banksecret)
    pin=hash.hash(req.body.pin)
    console.log("kal ma i",pin)
  
   
    if(sucess.banksecret==pin){  
        console.log("hello form the outer sky")  
        invoicefind={
            invoicenumber:req.body.invoice
        }            
        giventokentotalamount.invoiceTotalamount.findOne(invoicefind).then((sucessnext)=>{
            if(sucessnext){
                console.log(sucessnext.invoicenumber)
                
                if(parseInt(sucessnext.totalamount)<=parseInt(sucess.amount)
                ){
                    console.log("eligible for transaction")
                   newamount=parseInt(sucess.amount)-parseInt(sucessnext.totalamount)
                   bankaccountfind={
                    bankaccnumber:req.body.bankaccnumber
                    }
                   bankaccountupdate={
                       amount:newamount
                   }
                    useraccount.bankcredential.findOneAndUpdate(bankaccountfind,bankaccountupdate).then((sucesslast)=>{
                        if(sucesslast){
                            bankbook.quequefortransaction.find({invoice:req.body.invoice}).then((s)=>{
                                if(s){
                                    for (i=0;i<s.length;i++){
                                        
                                        obj={
                                            payeeAC:s[i].payeeAC,
                                            supplierAC:s[i].supplierAC,
                                            
                                            
                                            
                                            transactionID:s[i].transactionID,
                                            
                                            invoice:s[i].invoice,
                                            signedBy:s[i].signedBy,
                                        
                                            amount:s[i].amount,
                                            transactionTime:time.currentTime()
                                        }
                                        bankbook.pendingBankTransaction.create(obj).then((sucess)=>{
                                            if(sucess)
                                            {
                                                console.log("we have upload queque to the pending",sucess)
                                            }
                                        })
                                    }

                                }
                            })
                            
                            sendinginvoiceconfirmation(req.body.invoice)
                            console.log("succesfully updating pending transaction")
                            
                            res.send({Sucess:"true"})
                            

                        }


                    })
                }
                else{
                    res.send({balance:"false"})
                }
            }
        })

        
       
        
    }
    else{
        res.send({pin:"false"})
    }

}
})


})
function sendinginvoiceconfirmation(invoice){
      transactionconfrim={
          invoice:invoice,
          result:"success"
      }
const transactionlis = JSON.stringify(transactionconfrim);
            console.log(transactionlis)
                        
                            const options = {
                                hostname: '192.168.2.104',
                                port: 9004,
                                path: '/updateinvoiceconfirmation',
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
// if(request.url==){
//     if(request.method=="POST"){
//         console.log("getting fucking response from user site")
//         data=""
//         request.on("data",(chunck)=>{
//         data=chunck+data
        
//         })
//         datajson=JSON.parse(data)
//         console.log(datajson)
//         if(datajson.length){
//             recordtofind={
//             invoice:datajson.invoice
//             }
//             datatoupdate={
                
//             payeeAC:datajson.payeeAC
//             }
//             pendingbankTransaction.pendingBankTransaction.findOneAndUpdate(recordtofind,dataoupdate).then((success)=>{
//                 if(success.length){
//                     response.write("{succesfully transacted please wait for your order}")
//                 }
//             })
            

//         }
//         console.log()
//     }
app.listen("9001","192.168.2.104")