const http = require("http");

// url: http://127.0.0.1:3000/admin/user

const server = http.createServer((request, response) => {

    // Use cases: It’s helpful when receiving plain text, JSON, or form data in the request body.

    // Why it’s useful: Without setting the encoding, you would have to deal with buffer objects, which are not as convenient when working with text data.
    request.setEncoding("utf8");

    request.body = "";
    request.on("data", chunk => {
        request.body += chunk;
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