const mongoose =require('mongoose')


const productobject=new mongoose.Schema({productID:String,
                                         supplierID:String,
                                         quantity:String,
                                         price:String})
const  voucher= new mongoose.Schema({
    payeeID:String,
    vouchernumber:String,
    details:[productobject],
    confirmation:{type:String ,default: 'No'},
    pricetotal:String,
    productRecived:{
        type:String,default:"No"
    }

    
});



const vouchers=mongoose.model("voucher",voucher)
module.exports={
vouchers
}