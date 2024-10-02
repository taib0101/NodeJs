let crypto = require("crypto");

// SHA-256
let sha256 = crypto.createHash("sha256")
    .update("main Password")
    .digest("hex");
console.log(sha256);

// HMAC - Hash-Base Message Authentication Code
let hmac = crypto.createHmac("sha256","randomKeyForMoreSecure")
    .update("main Password")
    .digest("hex");
console.log(hmac);
