currentTime= function (){
var today = new Date();
var date = today.getFullYear().toString()+today.getMonth().toString()+today.getDate().toString();
var time = today.getHours().toString()  + today.getMinutes().toString()+ today.getSeconds().toString()+today.getMilliseconds().toString();
var dateTime = date+time;
return dateTime
}
module.exports={currentTime}
