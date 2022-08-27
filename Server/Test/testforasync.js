const { handle } = require("express/lib/application")
const { connection } = require("mongoose")

register=require("../MongooseScema/Schemas/person/PersonScema")
con=require("../MongooseOperation/connectiondb")
function hello(ma){
    return ma
}

async function myFunction(){

   

   

     


}
myFunction().then(
    
    function(value){
        console.log(value)
        async function kala(){
            kala={
                password:"magi",
                Email:"kali",
                Userid:"thone"
            }
            register.SupplierUser.create(kala).then((suc)=>{
                if(suc){
                    return suc
                }
                
            })
            
        }
      kala().then(
          function(value){
              console.log(value)
          },
          function(error){
              console.log(error)
          }
      )
        
    },
    function(error){
        console.log(error)

    }

)


