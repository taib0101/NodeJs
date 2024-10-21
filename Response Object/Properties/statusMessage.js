const http = require("http");

// url: http://127.0.0.1:3000/admin/user

const server = http.createServer((request, response) => {
    if(response.statusCode === 200)
        response.statusMessage = "OK";
    else
        response.statusMessage = "Not Found";
    console.log(response.statusMessage);
    response.end(response.statusMessage);
});

server.listen(3000,() => {
    console.log("port 3000 ...");
});