const noRouteHandler = (requestProperties,callback) => {
    console.log("this is noRouteHandle.");
    callback(501,{
        "message" : "not implemented"
    });
}

module.exports = noRouteHandler;