const http = require("http");
const fs = require("fs");

// url: http://127.0.0.1:3000/admin/user

const server = http.createServer((request, response) => {

    request.setEncoding("utf8");

    // this pipe is for stream, which data are send to buffer way

    let writeFile = fs.createWriteStream("write.txt");
    request.pipe(writeFile); // request -> writefile

    let readFile = fs.createReadStream("read.txt",'utf8');
    readFile.pipe(response); // readFile -> response

});

server.listen(3000, () => {
    console.log("port 3000 ...");
});