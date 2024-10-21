const http = require("http");

// url: http://127.0.0.1:3000/admin/user

const server = http.createServer((request, response) => {

    response.setHeader("content-type","text/plain");
    response.end(response.getHeader("content-type"));
});

server.listen(3000, () => {
    console.log("port 3000 ...");
});