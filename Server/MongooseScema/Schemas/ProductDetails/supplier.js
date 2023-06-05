let mongoose=require("mongoose")
let supplierproductSchema= new mongoose.Schema({
    productName:String,
    productId:String,
    Productdetail:String,
    total:String,
    price:String,
    
    supplierId:String,
    ImageId:String
    

})
let pendingproductSchema=new mongoose.Schema({
    productName:String,
    productId:String,
    Productdetail:String,
    total:String,
    pending:String,
    price:String,
    
    supplierId:String,
    orderId:String,

})
const supplierproduct=mongoose.model("supplierproductlisting",supplierproductSchema)
const pendingproduct=mongoose.model("pendingproduct",pendingproductSchema)
module.exports={
    supplierproduct,pendingproduct
}
