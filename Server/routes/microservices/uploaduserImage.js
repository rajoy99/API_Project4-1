const express = require('express')
const multer  = require('multer')
const users=require('./urlcraft/userobject')
const app = express()
const urlobject=require("./urlcraft/urldecode")
const hash=require("../../Hash/hashCollection")

var storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb((err)=>{
            console.log("error uploading image",err)

        },"./Assets/UserImage/Guserprofile")
    },
    
filename:(req,file,c)=>{
//     var requestUrl=req.url
//    var requestUrl=requestUrl.split("?")



//     console.log("requested url ",requestUrl[1])
//    // decodedurl=decodeURI(requestUrL)

//     var elementofobject=urlobject.keypair(requestUrl[1])
//     var email, password;
//     email=elementofobject["email"]
//     password=elementofobject['password']
//     photoname=email+password+"fuckphoto"
//     var photohashname=hash.hash(photoname)+".jpg"
//     console.log(file)
//     c((err)=>{
//         console.log("error uploading image",err)

//     },photohashname)


}
}
)
const uploadGuserprofile = multer({ dest: storage})
kala=users.user
console.log(kala["GenUser"])



app.post('/profile/Guser/?*',uploadGuserprofile.single("Guser") ,function (req, res, next) {

    console.log("i am here in post")
   
  
})
app.get('/profile/Guser/?*', function (req, res, next) {
    
    res.sendFile(__dirname + '/test.html')
   
  
})
//127.0.0.1:3003/profile/Guser/?gmail=lkjlkjafdfsdfs&password=ljlkjlkjlkjlkjlk
app.listen(3003,"127.0.0.1")

