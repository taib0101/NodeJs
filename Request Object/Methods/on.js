const http = require("http");

// url: http://127.0.0.1:3000/admin/user

const server = http.createServer((request, response) => {
    request.body = "";
    request.on("data", chunk => {
        request.body += chunk.toString();
    });

    request.on("end", () => {
        console.log(request.body);
        response.setHeader("content-type", "application/json"); // uppercase dosen't matter
        response.end(request.body); // request.body still in string, no need to do JSON.stringify
    });
});

server.listen(3000, () => {
    console.log("port 3000 ...");
});