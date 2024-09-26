let EventEmitter = require("events");

// raise here
class Server1 extends EventEmitter {
    functionn() {
        // connection raised from server1 and listen to server2
        this.emit("connection");
    }
}

// if you don't export class , it will not work
module.exports = Server1;
