// "https://nodejs.org/docs/latest/api/fs.html" go site for more information
let fs = require("fs");

// to write on to file
// synchronous write file
let writeFile = fs.writeFileSync(`${__dirname}/new.txt`,"bro taib\n");
let appendFile = fs.appendFileSync(`${__dirname}/new.txt`,"allright man\n");

// // to read from a file
// synchronous read file
let readData = fs.readFileSync(`${__dirname}/new.txt`);
console.log(readData.toString());

// synchronous delete file
fs.unlinkSync(`${__dirname}/new.txt`);

// -------------------------------------------------------------------------------


// asynchronous write file
// let writeData = new Uint8Array(Buffer.from("Bro fuck off\n"));
fs.writeFile(`${__dirname}/new.txt`, "Bro fuck off\n", (error) => {
    if (error) {
        throw error;
    }
    // console.log("wrote data");
});

// writeData = new Uint8Array(Buffer.from("fuck off 2\n"));
fs.appendFile(`${__dirname}/new.txt`, "fuck off 2\n", (error) => {
    if (error) {
        throw error;
    }
    // console.log("wrote data");
});

// asynchronous read file
fs.readFile(`${__dirname}/new.txt`, (error, data) => {
    if (error) throw error;
    console.log(data.toString());
});

// asynchronous delete file
fs.unlink(`${__dirname}/new.txt`,(error) => {
    if(error) console.log("delete error");
    else console.log("file removed");
});

// better practice is using asynchronous and more better practice is using async-await 