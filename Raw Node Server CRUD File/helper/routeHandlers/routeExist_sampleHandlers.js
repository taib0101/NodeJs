/*
    Title : Router Handler
    Description : Route Checking and Handling
    Author : Mustain Murtaza Taib
    Date : 28/09/2024
*/

// object or scaffolding
const route = {};

route.currentRoute = ["create","read","update","delete"];
route.sampleRouteHandler = (requestProperties,callback) => {
    console.log("this is sampleRouteHandler.");
    callback(200,{
        "Content-Type" : "application/json"
    });
}

route.noRouteHandler = (requestProperties,callback) => {
    console.log("this is noRouteHandle.");
    callback(501,{
        "Content-Type" : "application/json"
    });
}

console.log("This directory and file from ./helper/routeHandlers/routeExist_sampleHandlers .");

module.exports = route;