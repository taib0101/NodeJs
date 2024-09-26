let http = require("http");

// creating Server
// after creating server and listening port, then Event Loop occur
// Event Loop work for giving Intensive task to server, event loop work repeatively
let server = http.createServer((request,response) => {
    response.write("You can write it multiple times\n");
    if(request.url === "/") {
        response.write("it refer of request url path /")
    } else if(request.url === "/about") {
        response.write("this type path writing is more pain for million of path \n if you want raw nodeJs developer, you practice it\n");
        response.write("expressJS framework is better then Nodejs");
    } else {
        response.write("Not found");
    }
    response.end();
});

// when new connection arrive from event loop , a connection event will fire 
// when user hit to server this will occur
// in ral life we don't use this server.on().i did it for practice
// we use http.createServer((req,res) => {})
// server.on("connection",() => {
//     console.log("New connection ...");
// });

// server listening port number
server.listen(3000);

console.log("Server is Listening on 3000....");

// note : if using server.listen(3000) and show error to terminal 
// use this command on terminal: lsof -i:3000 (list of Open Files)