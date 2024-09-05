let function1 = (callback) => {
    setTimeout(() => {
        console.log("Took an order in asynchronous way");
        callback();
    } , 1000);
};

let function2 = (callback) => {
    setTimeout(() => {
        console.log("processing order in asynchronous way");
        callback();
    }, 1000);
};

let function3 = (callback) => {
    setTimeout(() => {
        console.log("deliver order in asynchronous way");
        callback();
    }, 1000);
};

let function4 = (callback) => {
    setTimeout(() => {
        console.log("report order in asynchronous way");
        callback();
    }, 1000);
};

// callback hell
// prevent callback hell using promises asynchronous
function1(() => {
    console.log("callback hell 1\n");
    function2(() => {
        console.log("callback hell 2\n");
        function3(() => {
            console.log("callback hell 3\n");
            function4(() => {
                console.log("callback hell done");
            });       
        });
    });
});