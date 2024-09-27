let fs = require("fs");
let http = require("http");

let server = http.createServer((request,response) => {
    // let readFile = fs.createReadStream(`${__dirname}/read.txt`);
    let readFile = fs.createReadStream(`${__dirname}/read.txt`,'utf8');

    // this pipe is for stream, which data are send to buffer way
    readFile.pipe(response);
});

server.listen(3000,() => {
    console.log("Server is listening ...");
});