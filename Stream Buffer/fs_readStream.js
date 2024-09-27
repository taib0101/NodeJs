let fs = require("fs");

// Method 01:
// fs.createReadStream(path);
let readStream = fs.createReadStream(`${__dirname}/note.txt`);

// listen to streamed data
readStream.on("data",(chunk) => {
    console.log(chunk.toString());
});

// Method 02:
readStream = fs.createReadStream(`${__dirname}/note.txt`,"utf8");
readStream.on("data",(chunk) => {
    console.log(chunk);
});

readStream.on("end",() => {
    console.log("all are passed");
})