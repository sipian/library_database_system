const crypto = require('crypto');
const hash = crypto.createHash('sha512');

hash.update('password');
console.log(hash.digest('hex'));
  // Prints:
  //   6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50