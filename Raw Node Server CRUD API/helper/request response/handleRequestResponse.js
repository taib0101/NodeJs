/*
    Title : Request Response Handler
    Description : Request from client , Response from server, Route Handler
    Author : Mustain Murtaza Taib
    Date : 30/09/2024
*/

// dependencies
const url = require("url");
const importedRoute = require(`${__dirname}/../routeHandlers/routes`);
const importedCheckJSON = require(`${__dirname}/../../utilities/checkJSON`);

// object or scaffolding
const handle = {};

handle.requestResponseHandler = (request, response) => {
    // request url
    const parsedURL = url.parse(request.url, true);
    const pathName = parsedURL.pathname;
    const trimmedPathName = pathName.replace(/^\/?|\/?$/g, "");
    const method = request.method.toLowerCase();
    const queryStringObject = parsedURL.query;
    const headerObject = request.headers;

    const requestProperties = {
        parsedURL,
        pathName: pathName,
        trimmedPathName,
        method: method,
        queryStringObject: queryStringObject,
        headerObject
    }

    // console.log();
    // console.log("parsedUrl :", parsedURL);
    // console.log();
    // console.log("requestProperties :", requestProperties);

    // checking imported route in object function
    // route handling
    const currentRouteHandler = !importedRoute["sampleRoute"].includes(trimmedPathName) ?
        importedRoute["userRoute"].includes(trimmedPathName) ? importedRoute.userRouteHandler
            : importedRoute.noRouteHandler
        : importedRoute.sampleRouteHandler;

    // give this let requestedClientData = "" else it will show undefined, and make problem for JSON.perse
    // requested data
    let requestedClientData = "";

    // request data come from client by buffering way
    request.on("data", (chunk) => {
        requestedClientData += chunk.toString();
    });

    request.on("end", () => {
        // taking requested data from client and inserting it to requestProperties.body
        // and checking it , client request valid data or not and making utilities to helper directory
        requestProperties.body = importedCheckJSON(requestedClientData);
        console.log("requestProperties Body :", requestProperties.body);

        currentRouteHandler(requestProperties, (statusCode, payload) => {
            
            response.setHeader("Content-Type","application/json");
            response.writeHead(statusCode);
            response.end(JSON.stringify(payload));

        });
    });

};
console.log("This directory and file from ./helper/request response/handleRequestResponse .");

// exporting handle object
module.exports = handle;