// "https://nodejs.org/docs/latest/api/os.html" go to this site to see more details
let os  = require("os");

console.log("operating system platform :",os.platform());
console.log("the host name of the operating system :",os.homedir());
console.log("the amount of free system memory in bytes as an integer :",os.freemem());
console.log("an array of objects containing information about each logical CPU core :",os.cpus());


