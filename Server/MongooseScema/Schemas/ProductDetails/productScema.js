let mongoose=require("mongoose")
let product= new mongoose.Schema({
    ImageID:String,
    productName:String,
    productId:String,
    Productdetail:String,
    available:String,
    supplierId:String,
    price:String

})
const productforpost=mongoose.model("productlisting",product)
module.exports={
    productforpost
}