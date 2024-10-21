const http = require("http");

// url: http://127.0.0.1:3000/admin/user

const server = http.createServer((request, response) => {

    // you can set header for once
    response.writeHead(200, "okay bro");

    // res.end([data], [encoding], [callback])
    // response.end();
    // you can send it for once
    // response.end("Done");
    response.end("Done", "utf8");
});

server.listen(3000, () => {
    console.log("port 3000 ...");
});