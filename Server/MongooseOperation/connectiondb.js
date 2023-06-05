var mongoose=require("mongoose")
connect=()=>{
    mongoose.connect("mongodb://localhost:27017/kala").then(
    console.log("mongodb has been connected")
).catch((e)=>{
    console.log(e)
});
}
disconnect=()=>{
    mongoose.disconnect(console.log("db disconneted after doing its operation"))
}
module.exports = {
    connect,disconnect

}