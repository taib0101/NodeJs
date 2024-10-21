const http = require("http");

// url: http://127.0.0.1:3000/admin/user

const server = http.createServer((request, response) => {

    // res.writeHead(statusCode, [statusMessage], [headers])
    
    // method 01:
    // response.writeHead(200);
    
    // method 02:
    // response.writeHead(200,"okay bro");
    
    // method 03:
    response.writeHead(200, "okay bro", {
        "content-type": "application/json"
    });
    
    // method 04:
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(JSON.stringify({ name: "Taib" }));
});

server.listen(3000, () => {
    console.log("port 3000 ...");
});