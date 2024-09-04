// this is asynchronous ,it Works at a lower level, directly with the stdin stream.
// this event actually work for EOF(end of file) input
// this is also non blocking asynchronous
// pres ctrl + d to exit 

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