
var approx = require('approximate-number');

const conv = (num) => {

    // if(num>=1e9){
    //     return String(num/1e9).split('.')[0]+"."+String(num/1e9).split('.')[1].slice(0,2)+"B"
    // }
    // else if(num>=1e6)
    // {
    //     return String(num/1e6).split('.')[0]+"."+String(num/1e6).split('.')[1].slice(0,2)+"M"
    // }
    // else if(num>=1e3)
    // {
    //     return String(num/1e3).split('.')[0]+"."+String(num/1e3).split('.')[1].slice(0,2)+"K"
    // }
    // else{
    //     return num
    // }
    return approx(num,precision=2,round=true,capital=true)

}

console.log(conv(10900009253))
console.log(conv(1234000))
console.log(conv(16555000))

console.log(conv(100))


