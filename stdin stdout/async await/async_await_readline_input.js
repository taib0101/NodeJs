
let input = () => {
    const readline = require("readline");
    let rl = readline.createInterface(process.stdin,process.stdout);

    const promise = new Promise((resolve,reject) => {
        rl.on("line" , (chunk) => {
            resolve(chunk.toString().trim());
            // process.exit();
            rl.close();
        });
    });
    return promise;
}

// in async function main
async function main() {
    let x = await input();
    x = parseInt(x);

    if(parseInt(x) > 0)
        console.log(`${x} is a positive number.`);
    else if(parseInt(x) < 0)
        console.log(`${x} is a negative number.`)
    else
        console.log(`The number is zero.`);

    // make it testcase
    let t = x;
    while(t--) {
        let y = await input();
        console.log(y);
    }
}
main();

// in async function anonymous
setTimeout(() => {
    console.log("\n in async function anonymous");
    (async () => {
        let x = await input();
        console.log(x);
    })();
}, 5000);


// use this code for better understand between promise then and async await
// input()
//     .then((chunk) => {
//         console.log(chunk);
//         let t = chunk.toString().trim();
//         t = parseInt(t);
//         while(t--) {
//             input()
//                 .then((chunk1) => {
//                     console.log(chunk1);
//                 });
//         }
//     });
