const http = require("http");

// url: http://127.0.0.1:3000/admin/user

const server = http.createServer((request, response) => {

    // you can set header for once
    response.setHeader("content-type", "text/html");
    response.writeHead(200, "okay bro");

    // you can send data for multiple times
    // res.write(chunk, [encoding], [callback])
    // method 01:
    // response.write("file.txt");
    
    // method 02:
    // response.write("file.html","utf8");
    
    // method 03:
    // response.write("file.html","utf8",() => {
    //     console.log("chunk of file sended");
    // });

    // method 04:
    response.write('<h1>Hello, World!</h1>');
    response.write('<h1>Hello, World!</h1>');

    response.end();
});

server.listen(3000, () => {
    console.log("port 3000 ...");
});