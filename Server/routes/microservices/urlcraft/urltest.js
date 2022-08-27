var uri = 'https://javaguides.net/?x=kala%20y=kalas%20kdf';
var encoded = encodeURI(uri);
console.log(encoded);
try {
  console.log(decodeURI(uri));
} catch(e) { // catches a malformed URI
    
  console.error(e);
}
