let fs = require("fs");

let readFileStream = fs.createReadStream(`${__dirname}/note.txt`);
let writeFileStream = fs.createWriteStream(`${__dirname}/output.txt`);

// this is better practice because time and memory complexity
readFileStream.on("data",(chunk) => {
    writeFileStream.write(chunk);
})
fs.appendFileSync(`${__dirname}/output.txt`,"\n")

let buffer = Buffer.from(fs.readFileSync("output.txt"));
console.log(buffer);
// console.log(fs.readFileSync("output.txt"));
