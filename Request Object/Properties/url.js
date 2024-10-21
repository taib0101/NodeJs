const http = require("http");

// url: http://127.0.0.1:3000/admin/user

const server = http.createServer((request, response) => {
    console.log(request.url);
    response.end(request.url);
});

server.listen(3000,() => {
    console.log("port 3000 ...");
});