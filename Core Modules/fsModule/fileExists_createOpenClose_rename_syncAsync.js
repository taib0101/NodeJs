let fs = require("fs");

// is file Exists?
console.log("File Exist ?",fs.existsSync(`${__dirname}/read.txt`)); 

// create a file
// asynchronous 
fs.open(`${__dirname}/read.txt`,'w',(error,fileDescriptor) => { // in open "w" is flag, there have more flag, go and see the details nodejs documentation
    if(error) throw error;
    console.log("file created");
    console.log("file descriptor :",fileDescriptor);

    // close, if file open you have to must close
    fs.close(fileDescriptor,(error) => {
        console.log("file closed");
    });
});

// promises
// let fs = require("fs").promises;
// let openFile = await fs.open("path","flag")
// openFile.close()


// for async-await you don't need to give callback function
// let fs = require("fs").promises
// await fs.open(`path`,"w");

// synchronous
let openFile = fs.openSync(`${__dirname}/read.txt`,'w');

// close
fs.close(openFile);

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
// fs.renameSync(`${__dirname}/read.txt`,`${__dirname}/new.txt`);
