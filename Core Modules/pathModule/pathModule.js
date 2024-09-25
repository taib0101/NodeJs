// "https://nodejs.org/docs/latest/api/path.html" go to this link to know more information
let path = require("path");
let myPath = "/home/murtaza/Documents/ostad_git/NodeJs/Core\ Modules/pathModule.js";

// methods
// path.basename(path[, suffix])
console.log("Only File Name :",path.basename(myPath));
console.log("Only File Name Without File Type :",path.basename(myPath,".js"));
console.log("Only Directory of File :",path.dirname(myPath));
console.log("Only File Type of File :",path.extname(myPath));
console.log("Object of File Information :",path.parse(myPath));