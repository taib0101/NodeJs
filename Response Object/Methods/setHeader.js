const http = require("http");

// url: http://127.0.0.1:3000/admin/user

const server = http.createServer((request, response) => {

    // header set for once
    response.setHeader("content-type","text/plain");
    response.setHeader("content-type","application/json");
    response.end(JSON.stringify({ name: "Taib" }));
});

server.listen(3000, () => {
    console.log("port 3000 ...");
});