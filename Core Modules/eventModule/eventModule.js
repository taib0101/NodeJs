// Event Module is a paradigm to control program flow by event like user action
// we can handle custom event by EventEmitter class
// require("events") return EventEmitter class BluePrint
let EventEmitter = require("events");
let server = new EventEmitter();

// "https://nodejs.org/docs/latest/api/events.html" go this site to see more details

// first register listener for "ring" event. step 02
// server.on("ring", () => {
//     console.log("ring listening");
// });

// it will listen event for once like DOM at client side button.addEventListener(()=>{},{once:true})
server.once("ring", () => {
    console.log("ring listening");
});

// raise an event . step 01
server.emit("ring");

// register listener with parameter
server.on("ring", (parameter) => {
    console.log(parameter);
});

server.emit("ring", "first time");

// register listener with object parameter
server.emit("ring",{name : "Taib",age : 30});
