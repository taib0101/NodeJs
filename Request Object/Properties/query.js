const http = require("http");
const url = require("url");

// url: http://127.0.0.1:3000/admin/user?query=122423

// if you want request query, you have to use url.parse()
const server = http.createServer((request, response) => {
    const parsedURL = url.parse(request.url, true);
    request.query = parsedURL.query; // it returns object
    console.log(request.query);
    response.end(JSON.stringify(request.query));
});

server.listen(3000, () => {
    console.log("port 3000 ...");
});