const importedSampleRouteHandler = require(`${__dirname}/sampleRouteHandler/sampleRouteHandler`);
const importNoRouteHandler = require(`${__dirname}/noRouteHandler/noRouteHandler`);
const importUserRouteHandler = require(`${__dirname}/userRouteHandler/userRouteHandler`);

const route = {};

route.sampleRoute = ["create","read","update","delete"];
route.userRoute = ["user"];

route.sampleRouteHandler = importedSampleRouteHandler;
route.noRouteHandler = importNoRouteHandler;
route.userRouteHandler = importUserRouteHandler;

console.log("This directory and file from ./helper/routeHandlers/routes.");

module.exports = route;