// "https://nodejs.org/docs/latest/api/fs.html" go site for more information
let fs = require("fs");

// to write on to file
// synchronous write file
let writeFile = fs.writeFileSync(`${__dirname}/new.txt`,"bro taib\n","utf8");
// let writeFile = fs.writeFileSync(`${__dirname}/new.txt`,"bro taib\n"); // same
let appendFile = fs.appendFileSync(`${__dirname}/new.txt`,"allright man\n","utf8");
// let appendFile = fs.appendFileSync(`${__dirname}/new.txt`,"allright man\n"); // same


// asynchronous write file
// fs.writeFile(`${__dirname}/new.txt`, "Bro fuck off\n", (error) => {}); // same
fs.writeFile(`${__dirname}/new.txt`, "Bro fuck off\n","utf8", (error) => {
    if (error) {
        throw error;
    }
    // console.log("wrote data");
});

// fs.appendFile(`${__dirname}/new.txt`, "fuck off 2\n", (error) => {}); // same
fs.appendFile(`${__dirname}/new.txt`, "fuck off 2\n","utf8", (error) => {
    if (error) {
        throw error;
    }
    // console.log("wrote data");
});

// -------------------------------------------------------------------------------

// // to read from a file
// synchronous read file
// let readData = fs.readFileSync(`${__dirname}/new.txt`,"utf8");
let readData = fs.readFileSync(`${__dirname}/new.txt`);
console.log(readData.toString());

// asynchronous read file
fs.readFile(`${__dirname}/new.txt`,"utf8", (error, data) => {
    if (error) throw error;
    console.log(data.toString());
});

// ----------------------------------------------------------------------

// synchronous delete file
fs.unlinkSync(`${__dirname}/new.txt`);

// // asynchronous delete file
// fs.unlink(`${__dirname}/new.txt`,(error) => {
//     if(error) console.log("delete error");
//     else console.log("file removed");
// });

// better practice is using asynchronous and more better practice is using async-await 
