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
var jsonParser = bodyParser.json()
app.use(cors({
    origin: "*",

    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.post('/login',jsonParser, (req, res) => {
    
  
dbconnect.connect()
console.log(req.url)

console.log("i am in ",req.body)
  


  
  let email=req.body.user["email"]
  console.log(email)
  let password=req.body.user["password"]
  let usertype=req.body.user["user"]
  

  
  let usercredentailin={
    email:email,
    password:password
                     }
  
   
    if(usertype=="Suser"){

     
     
       
        console.log("i am in log suuser")
          users.SupplierUser.find(usercredentailin).then(function success(m){
             
              if(m.length){
                //console.log("sucessfully found",m)

                  
                 res.send({validate:true})
              }
              else 
              {
              //  console.log('no user',m)
                res.send({validate:false})
              }
      
          }).catch(function error(e){
          console.log(e)
          }
          ).finally(function stop(){
          });
      
      
    
    }
   
    
    
    
   
    
    
  
})
app.post('/login/token/confirmation',jsonParser,(req,res)=>{
  dbconnect.connect()

  console.log(req.cookstring)
 
  console.log("name of the cokkie",req.body)
  let hash=req.body["cookstring"]
  let password=req.body["password"]
  let email=req.body["email"]
  
  usercredentail={
   
    token:hash,
    password:password,
    email:email
    
}
loginUser.logger.create(usercredentail).then(function success(m){
   console.log("successfully logged")
  
res.send({tokensuccess:true})
 

}).catch(function error(e){
console.log(e)
}
).finally(function stop(){
});


  
})


app.post('/logout', jsonParser,(req, res) => {

  dbconnect.connect()
  console.log(req.body)
 
 token=req.body["session_idr"]
 session={
   token:token

 }
 loginUser.logger.findOneAndDelete(session).then(function success(m){
  console.log("user has been deleted")
  if(m){
  res.send({signal:"true"})
  }
  else{
    console.log("i dont know what to do",m)
    res.send({signal:"false"})
  }


}).catch(function error(e){
console.log(e)
}
).finally(function stop(){
});
  
 

})


app.listen(3002,"192.168.2.104", () => {
  console.log(`Example app listening on port 3002`)
})