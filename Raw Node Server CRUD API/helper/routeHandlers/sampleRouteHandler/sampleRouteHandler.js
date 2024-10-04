const sampleRouteHandler = (requestProperties,callback) => {
    console.log("this is sampleRouteHandler.");
    callback(200,{
        "message" : "clear"
    });
}

module.exports = sampleRouteHandler;