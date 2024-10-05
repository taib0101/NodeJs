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

    // request Object properties
    const requestProperties = {
        parsedURL,
        pathName: pathName,
        trimmedPathName,
        method: method,
        queryStringObject: queryStringObject,
        headerObject
    }

    // route select
    const currentRouteHandler = !importedRoute["sampleRoute"].includes(trimmedPathName) ?
        !importedRoute["userRoute"].includes(trimmedPathName) ?
            importedRoute["tokenRoute"].includes(trimmedPathName) ?
                importedRoute.tokenHandler : importedRoute.noRouteHandler
            : importedRoute.userRouteHandler
        : importedRoute.sampleRouteHandler;

    let requestedClientData = "";

    // request data
    request.on("data", (chunk) => {
        requestedClientData += chunk.toString();
    });

    request.on("end", () => {
        // check JSON for requested buffer data
        requestProperties.body = importedCheckJSON(requestedClientData);

        currentRouteHandler(requestProperties, (statusCode, payload) => {

            // console.log(payload);

            response.setHeader("Content-Type", "application/json");
            response.writeHead(statusCode);
            response.end(JSON.stringify(payload));

        });
    });

};
console.log("This directory and file from ./helper/request response/handleRequestResponse .");

// exporting handle object
module.exports = handle;