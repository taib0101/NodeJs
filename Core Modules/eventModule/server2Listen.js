let EventEmitter = require("events");
let CustomEvent1 = require("./server1Raise");// no need to tell .js , because this nodejs smartness

let server1Raise = new CustomEvent1();

// listen here
server1Raise.on("connection",() => {
    console.log("Connection listening from server2");
});

// raise event from server1Rise
server1Raise.functionn();
