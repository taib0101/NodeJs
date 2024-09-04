// this is also asynchronous
let readline = require("readline");
let rl = readline.createInterface(process.stdin,process.stdout);

rl.on("line" , (chunk) => {
    console.log("input is : ",chunk.toString().trim());
});

rl.on("close" , () => {
    console.log("Exited");
});