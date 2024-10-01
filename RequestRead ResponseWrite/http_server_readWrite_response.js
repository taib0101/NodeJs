let fs = require("fs");
let http = require("http");

let server = http.createServer((request, response) => {
    // open terminal run this file and go ot browser
    // type this url http://127.0.0.1/action or http://127.0.0.1/fetch
    if (request.url === "/action") {
        response.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>      
        `);
        response.write(`
            <body>
                <h1>This is a man</h1>
                <!--attribute action redirect the path-->
                <form method="post" action="/form">
                    <button>Click</button>
                </form>
            </body>
           </html> 
        `);

        response.end();
    } else if (request.url === "/fetch" && request.method === "GET") {
        // read file
        let readFile = fs.readFileSync(`${__dirname}/fetch_request.html`, "utf8");

        // write html file for response of server
        response.write(readFile);

        response.end();

        // else if(request.url === "/form") you can only use this
    } else if (request.url === "/form" && request.method === "POST") {
        // don't use response.write when you send response to client
        // response.write("Response done\n");

        console.log("request url is :", request.url);

        // listening request event
        request.on("data", (chunk) => {
            // you can get chunk, when  request is done. it comes chunk by buffer
            // you can get it also by url.parse(request.url).
            console.log("Chunk :", chunk.toString());
        });

        request.on("end", () => {
            // Set the response headers to indicate the content type is JSON
            // don't use response.write() when you send response Object
            // you can set Header by response.setHeader("key","value")
            response.writeHead(200, { "Content-Type": "application/json" });

            const responseObject = {
                name: "John Doe",
                age: 30
            };

            // Send the object as a JSON response
            response.end(JSON.stringify(responseObject));
            console.log("response.end(responseObject)")
        });
    }

});

server.listen(3000, () => {
    console.log("Server is listening to port 3000 ...");
});
