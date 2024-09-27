let fs = require("fs");

let readFileStream = fs.createReadStream(`${__dirname}/note.txt`);
let writeFileStream = fs.createWriteStream(`${__dirname}/output.txt`);

readFileStream.on("data",(chunk) => {
    writeFileStream.write(chunk);
})
fs.appendFileSync("output.txt","\n")

console.log(fs.readFileSync("output.txt"));
let buffer = Buffer.from(fs.readFileSync("output.txt"));
console.log(buffer);
