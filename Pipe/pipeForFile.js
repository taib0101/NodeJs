let fs = require("fs");

// createReadStream, createWiteStream doesn't support async-await
// let readFile = fs.createReadStream(`${__dirname}/read.txt`);
let readFile = fs.createReadStream(`${__dirname}/read.txt`,"utf8");
let writeFile = fs.createWriteStream(`${__dirname}/write.txt`);

// to make easy of this code readFile.on("data",(chunk) => {writeFile.write(chunk);}), we use pipe
readFile.pipe(writeFile);
