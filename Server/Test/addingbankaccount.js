var generalbankuser=require("../MongooseScema/Schemas/BankScema/useraccountdetails")
var hash=require("../Hash/hashCollection")
var conncetion=require("../MongooseOperation/connectiondb")

async function addaccount(accountnumber,pin,amount){
    await conncetion.connectBank()
    pin=await hash.hash(pin)
    console.log("mama i ma ")
    obj={
        bankaccnumber:accountnumber,
    
        banksecret:pin,
        amount:amount
       
    }
    await generalbankuser.bankcredential.create(obj).then((s)=>{
        if(s){
        console.log("succesfully created",s)
        }
    })


}
addaccount("201733108","2017","3424234234")

