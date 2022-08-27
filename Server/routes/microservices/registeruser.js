const express = require('express')
const cors = require('cors')
const app = express()
var bodyParser = require('body-parser')
const port = 3000
const hash=require('../../Hash/hashCollection')
//const registerstaff=require('../../MongooseOperation/registerUser.js')
const users = require('../../MongooseScema/Schemas/person/PersonScema')
const urlobject=require("./urlcraft/urldecode.js")
const usertype=require("./urlcraft/userobject")
const connection=require("../../MongooseOperation/connectiondb")
let urlencodedParser=bodyParser.urlencoded({extended:false})
app.use(express.json());
var jsonParser = bodyParser.json()
http=require("http")

connection.connect()

app.use(
  cors({
    origin: "*",
    
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);


app.post('/register', jsonParser, async (req, res) => {
  console.log("user reister ")
  
   console.log("the above all ",req.body)
   connection.connect()

   
  //   requestUrl=req.url
  //   console.log("my url",requestUrl)
  //   requestUrl=requestUrl.split("?")


  //   console.log("requested url ",requestUrl[1])
  //  // decodedurl=decodeURI(requestUrL)
  //   elementofobject=urlobject.keypair(JSON.stringify(requestUrl[1]))
    


    


    
     let email=req.body["email"]
     let password=req.body["password"]
     password=hash.hash(password)
     cred={
       Email:email,
       password:password
     }
    
    // let usertype=elementofobject["usertype"]
    // input=email+password
    console.log(req.body["usertype"])
    

    if(req.body["usertype"]=="Suser")
    {
    
        
      users.SupplierUser.create(cred).then(function success(m){
        console.log("successfully inserted record")

        if(m){
          kala=m.Email+m.password
          huser=hash.hash(kala)

          bankneeded={"supplierAC":huser}




const transactionlist = JSON.stringify(bankneeded

);


    const options = {
        hostname: '127.0.0.1',
        port: 9009,
        path: '/newAccount',
        method: 'POST',
        headers: {
        'Content-Type': 'text/json',
        'Content-Length': transactionlist.length,
        },
    };
    
    const request = http.request(options, response => {
      
    
        res.on('data', d => {
        process.stdout.write(d);
        });
    });
    
    request.on('error', error => {
        console.error(error);
    });
    
    request.write(JSON.stringify(bankneeded));
    request.end();


       res.send({registration:true})
        }
        else{
          res.send({registration:false})
        }
     
    
    }).catch(function error(e){
    console.log(e)
    }
    ).finally(function stop(){
    });
      
    }






    if(req.body["usertype"]=="Guser")
    {

      users.GeneralUser.create(cred).then(function success(m){
        console.log("successfully inserted record")

        if(m){
       res.send({registration:true})
        }
        else{
          res.send({registration:false})
        }
     
    
    }).catch(function error(e){
    console.log(e)
    }
    ).finally(function stop(){
    });
      
    }

    
  
   
  
})
app.get('/',(req,res)=>{
  

  console.log("knock knock i am here")
  res.writeHead(302,{
    Location:"http://192.168.2.103:3001/signup"
  });
  res.end();
})

app.listen(3001,"192.168.2.104", () => {
  console.log("app is listening")
})