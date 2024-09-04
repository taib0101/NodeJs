// this is asynchronous ,it Works at a lower level, directly with the stdin stream.
// this method is done for single input for each testcase
// you can't watch output line by line for each testcase
// you can call process.stdin.on for once for better practice
// you can call process.stdin.on for once for better practice, first one stdin.on will work
// second one will not work


// it use when directly works stdin stream
process.stdin.resume();
process.stdin.setEncoding('utf8');


// example 1
// console.log("execution 1");
// process.stdin.on("data" , (chunk) => {
//     process.stdout.write(`chunk is ${chunk.toString().trim()}\n`);
//     process.exit();
// });

// process.on("exit" , () => {
//     console.log("asynchronous input done and exited");
// });
// process.stdout.write("execution 2\n");


// example 2
console.log("execution 1");
let t = -1;
process.stdin.on("data" , (chunk) => {
    console.log("It take input first then give output");
    if(t !== -1) {
        if(t === 0) {
            console.log("exit process");
            process.exit();
        }

        if(chunk.toString().trim() !== "") {
            let arr = chunk.toString().trim().split(" ");
            process.stdout.write(`arr : ${arr}\n`);
            t--;
        }

    } else {
        t = parseInt(chunk.toString().trim());
        console.log("testcase : ",t);
    }
    console.log("\n");
});

process.on("exit" , () => {
    console.log("asynchronous input done and exited");
});
process.stdout.write("execution 2\n");
