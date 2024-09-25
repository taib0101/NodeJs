// "https://nodejs.org/docs/latest/api/fs.html" go site for more information
let fs = require("fs");

// to write on to file
// synchronous write file
// fs.writeFileSync("new.txt","bro taib\n");
// fs.appendFileSync("new.txt","allright man\n");

// asynchronous write file
let writeData = new Uint8Array(Buffer.from("Bro fuck off\n"));
fs.writeFile("new.txt",writeData,(error) => {
    if(error){
        throw error;
    }
    console.log("wrote data");
});

writeData = new Uint8Array(Buffer.from("fuck off 2\n"));
fs.appendFile("new.txt",writeData,(error) => {
    if(error){
        throw error;

    }
    console.log("wrote data");
});

// to read from a file
// synchronous read file
let readData = fs.readFileSync("new.txt");
console.log(readData.toString());

// asynchronous read file
fs.readFile("new.txt",(error,data) => {
    if(error) throw error;
    console.log(data.toString());
});

// better practice is using asynchronous and more better practice is using async-await 