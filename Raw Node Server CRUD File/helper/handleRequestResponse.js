/*
    Title : Request Response Handler
    Description : Request from client , Response from server, Route Handler
    Author : Mustain Murtaza Taib
    Date : 28/09/2024
*/

// dependencies
const url = require("url");
const importedRoute = require(`${__dirname}/routeHandlers/routeExist_sampleHandlers`); // imported Route

// object or scaffolding
const handle = {};

handle.requestResponseHandler = (request,response) => {
    const parsedURL = url.parse(request.url,true);
    const pathName = parsedURL.pathname;
    const trimmedPathName = pathName.replace(/^\/?|\/?$/g,"");
    const method = request.method;
    const queryStringObject = parsedURL.query;
    const headerObject = request.headers;

    const requestProperties = {
        parsedURL,
        pathName : pathName,
        trimmedPathName,
        method : method,
        queryStringObject : queryStringObject,
        headerObject
    }

    console.log();
    console.log("parsedUrl :",parsedURL);
    console.log();
    console.log("requestProperties :",requestProperties);

    // checking and imported route object function
    const currentRouteHandler = importedRoute["currentRoute"].includes(trimmedPathName) ?
        importedRoute.sampleRouteHandler : importedRoute.noRouteHandler;

    currentRouteHandler(requestProperties,(statusCode,payload) => {
        response.writeHead(statusCode,payload);
    });
    response.end();
};

console.log("This directory and file from ./helper/handleRequestResponse .");

// exporting handle object
module.exports = handle;