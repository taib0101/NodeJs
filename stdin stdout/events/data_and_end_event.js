// this is asynchronous ,it Works at a lower level, directly with the stdin stream.
// this event actually work for EOF(end of file) input
// this is also non blocking asynchronous
// press ctrl + d to exit 

// it use when directly works stdin stream
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdout.write("execution 1\n");
let arr = [];
process.stdin.on("data" , (chunk) => {
    arr.push(chunk.toString().trim());
});

process.stdin.on("end" , () => {
    console.log("input end of file\n");
    console.log(arr);
});
process.stdout.write("execution 2\n");
