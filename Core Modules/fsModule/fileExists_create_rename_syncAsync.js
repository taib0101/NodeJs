let fs = require("fs");

// is file Exists?
console.log("File Exist ?",fs.existsSync(`${__dirname}/read.txt`)); 

// create a file
// asynchronous 
fs.open(`${__dirname}/read.txt`,'w',(error,file) => {
    if(error) throw error;
    console.log("file created");
});

// for async-await you don't need to give callback function
// let fs = require("fs").promises
// await fs.open(`path`,"w");

// synchronous
fs.openSync(`${__dirname}/read.txt`,'w');

// ------------------------------------------------------------------------------

// rename
// asynchronous
// fs.rename(old,new)
// fs.rename(`${__dirname}/read.txt`,`${__dirname}/new.txt`,(error,file) => {
//     if(error) throw error;
//     console.log("file renamed");
// });

// for async-await you don't need to give callback function
// let fs = require("fs").promises
// await fs.rename(`${__dirname}/read.txt`,`${__dirname}/new.txt`);

// synchronous
fs.renameSync(`${__dirname}/read.txt`,`${__dirname}/new.txt`);