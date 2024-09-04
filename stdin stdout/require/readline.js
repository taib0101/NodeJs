// this is also asynchronous
// Provides a higher-level abstraction for reading input line-by-line.
let readline = require("readline");
let rl = readline.createInterface(process.stdin,process.stdout);

rl.on("line" , (chunk) => {
    console.log("input is : ",chunk.toString().trim());
});

rl.on("close" , () => {
    console.log("Exited");
});
