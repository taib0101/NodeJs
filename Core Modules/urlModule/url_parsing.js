let http = require("http");
let url = require("url");

let server = http.createServer((request,response) => {
    // request Handling 
    // get the url and parse it
    const parsedURL = url.parse(request.url,true) // request.url for request path and true means url will consider for url parameters like 127.0.0.1/about?id=2353446

    const pathName = parsedURL.pathname;
    const trimmedPathName = pathName.replace(/^\/?|\/?$/g,"");
    const method = request.method;
    const queryObject = parsedURL.query;
    const headersObject = request.headers;

    console.log("parsedURL :",parsedURL);
    console.log("pathName :",pathName);
    console.log("trimmedPathName :",trimmedPathName);
    console.log("method :",method.toLowerCase());
    console.log("query :",queryObject);
    console.log("headers :",headersObject);

    response.end("Bro Taib");
});

server.listen(3000,() => {
    console.log("Server listening at port 3000 ...");
});
