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

    } else if (request.url === "/fetch") {
        // read file
        let readFile = fs.readFileSync(`${__dirname}/fetch_request.html`,"utf8")
        
        // write html file for response of server
        response.write(readFile);

    // else if(request.url === "/form") you can only use this
    } else if (request.url === "/form" && (request.method === "POST" 
        || request.method === "GET")) {
        response.write("Response done");

        // listening request event
        request.on("data",(chunk) => {
            // you can get chunk, when post request is done not for get request
            console.log("Chunk :",chunk.toString());
        });

        console.log("request url is :", request.url);
    }
    response.end();
});

server.listen(3000);