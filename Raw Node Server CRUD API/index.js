/*
    Title : Raw NodeJS create Server and CRUD Files and API
    Description : Creating Server, Request Response Handler, Route Handler, Environment Handler, CRUD Files and API
    Author : Mustain Murtaza Taib
    Date : 30/09/2024
*/

// dependencies
const http = require("http");
const importedRequestResponseHandler = require(`${__dirname}/helper/request response/handleRequestResponse`);
const importedEnvironmentHandler = require(`${__dirname}/helper/environment/environmentHandler`);

const app = {};

// imported environment object
app.config = importedEnvironmentHandler;

// dependencies
app.requestResponseHandler = importedRequestResponseHandler.requestResponseHandler;
// console.log("app.requestResponseHandler :",app.requestResponseHandler);

app.createServer = function () {
    const server = http.createServer(this.requestResponseHandler);
    server.listen(this.config.port, () => {
        console.log(`listening server at port ${this.config.port} ....`);
        console.log(`environment is ${this.config.environmentName}.`);
    });
};
app.createServer();

// ------------------------------------------------------------------------------------
// File CRUD part

// dependencies
const importedData = require(`${__dirname}/lib/data`);

const inputFunction = () => {
    const readLine = require("readline").createInterface(process.stdin, process.stdout);
    return new Promise((resolve, reject) => {
        readLine.on("line", (chunk) => {
            resolve(chunk.toString().trim());
            readLine.close();
        });
    });
}

async function dataMain() {
    let inputTestCase = parseInt(await inputFunction());
    // console.log("input case :", inputTestCase);
    while (inputTestCase--) {
        let readCRUD = await inputFunction();
        readCRUD = readCRUD.toLowerCase();

        let directory = await inputFunction();
        directory = directory.toLowerCase();

        let file = await inputFunction();
        file = file.toLowerCase();

        if (readCRUD === "create") {
            importedData.create(directory, file, (objectInformation) => {
                console.log("Create File :", objectInformation);
            })
        } else if (readCRUD === "read") {
            importedData.read(directory, file, (objectInformation, exactInformation, read) => {
                console.log("Read File :", objectInformation);
                console.log("Exact Information :", exactInformation);
                console.log("Read :\n", read);
            });
        } else if (readCRUD === "update") {
            let updateData = await inputFunction();
            importedData.update(directory, file, updateData, (objectInformation, exactInformation, read) => {
                console.log("update File :", objectInformation);
                console.log("Exact Information :", exactInformation);
                console.log("Update :\n", read);
            });
        } else {
            importedData.delete(directory,file,(objectInformation,exactInformation) => {
                console.log("Delete File :", objectInformation);
                console.log("Exact Information :", exactInformation);
            });
        }
    }
}
dataMain();
// console.log(importedData);
