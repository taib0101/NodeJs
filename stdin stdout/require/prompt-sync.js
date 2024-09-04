// go to terminal and give command
// npm install prompt-sync
// this is synchronous input using require


let promptSync = require("prompt-sync")({sigint:true});
let t = promptSync("Take input for testcase : ");

while(t--) {
    let [n,m] = promptSync().split(" ");
    [n,m].map(value => parseInt(value));
    console.log("n = %d, m = %d",n,m);

    let arr = promptSync().split(" ");
    arr.map(value => parseInt(value));
    console.log(arr);
}