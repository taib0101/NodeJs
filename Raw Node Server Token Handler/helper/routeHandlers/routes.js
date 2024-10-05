const importedSampleRouteHandler = require(`${__dirname}/sampleRouteHandler/sampleRouteHandler`);
const importNoRouteHandler = require(`${__dirname}/noRouteHandler/noRouteHandler`);
const importUserRouteHandler = require(`${__dirname}/userRouteHandler/userRouteHandler`);
const importedTokenHandler = require(`${__dirname}/tokenHandler/tokenHandler`);

const route = {};

route.sampleRoute = ["create","read","update","delete"];
route.userRoute = ["user"];
route.tokenRoute = ["token"];

route.sampleRouteHandler = importedSampleRouteHandler;
route.noRouteHandler = importNoRouteHandler;
route.userRouteHandler = importUserRouteHandler;
route.tokenHandler = importedTokenHandler;

console.log("This directory and file from ./helper/routeHandlers/routes.");

module.exports = route;