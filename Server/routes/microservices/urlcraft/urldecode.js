
let listofkeypair=(url)=>{
  var  keypair=url.split("&")
    return keypair

}
let replacingwithspace=(str)=>{
  console.log("type of ",typeof(str))
  s=str.replace("%20"," ")
  return s

}
let keypair=(url)=>{
  var  obj={}
  var  l=listofkeypair(url)
    for (var i=0 ;i<l.length;i++){
     var   k=l[i]
        split=k.split("=")
        for (var j=0;j<split.length;j++){
          var  object={
                [split[j]]:replacingwithspace(split[++j])
            }
        }
        obj=Object.assign(obj,object)
    }
 return obj
}



test=()=>{

  var  text="?kala=jlkjll%20kljklkj%20&kljk=iofdskjl%20ljdlkj"
  text=text.replace("?","")
  console.log(replacingwithspace(text))
var  k= keypair(text)
  console.log(k)
}
test()
module.exports={
    keypair
}
