// synchronous
let fs = require("fs");
let fsp = require("fs").promises;

//making directory
// synchronous
// fs.mkdirSync(`${__dirname}/dir`);

// asynchronous
fs.mkdir(`${__dirname}/dir`,(error,directory) => {
    console.log("directory created");
});

// promises
// await fsp.mkdir(`${__dirname}/dir`)

// -----------------------------------------

// delete directory
//synchronous
fs.rmdirSync(`${__dirname}/dir`);

// asynchronous
// fs.rmdir(`${__dirname}/dir`,(error,directory) => {
//     console.log("directory deleted");
// });

// promises
// await fsp.rmdir(`${__dirname}/dir`)
