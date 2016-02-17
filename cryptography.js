var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'popcorn';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
var t="popcorn";
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,t)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}
 
var hw = encrypt("password")
// outputs hello world
console.log(hw);
console.log(decrypt(hw));
 

/*
aes-256-ctr : eda6dc0e871c3755965ef5

*/