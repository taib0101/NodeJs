// to prevent callback hell , we can use asynchronous promises
let order = true;

let function1 = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (order) resolve("resolved promises from function1");
            else reject("rejected promises from function1");
        }, 1000);
    });

    return promise;
};

let function2 = () => {
    const promise = new Promise((resolve, reject) => {
        // console.log("this is fun2 in promises");
        setTimeout(() => {
            if (order) resolve("resolved promises from function2");
            else reject("rejected promises from function2");
        }, 1000);
    });

    return promise;
};

let function3 = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (order) resolve("resolved promises from function3");
            else reject("rejected promises from function3");
        }, 1000);
    });

    return promise;
};

let function4 = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (order) resolve("resolved promises from function4");
            else reject("rejected promises from function4");
        }, 1000);
    });

    return promise;
};

// example 1:
// we can call like this 
setTimeout(() => {
    console.log("Example 01");
    function1()
        .then((function1_value) => {
        
            console.log(function1_value);
            function2()
                .then((function2_value) => {
                
                    console.log(function2_value);
                    function3()
                        .then((function3_value) => {
                        
                            console.log(function3_value);
                            function4()
                                .then((function4_value) => {
                                
                                    console.log(function4_value);
                                })
                                
                                .catch((error) => {
                                    console.log(error);
                                });
                        })

                        .catch((error) => {
                            console.log(error);
                        });
                })

                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
} , 1000);


// example 2:
// and also we can call like this
// and this is easy to use then example 01
setTimeout(() => {
    console.log("");
    console.log("Example 02");
    function1()
        .then(function2)
        .then(function3)
        .then(function4)
        .then((value) => {
            console.log(value);
            return 2000;
        })
        .then(value => value)
        .then(result => console.log(result))
        .catch((error) => {
            console.log(error);
        });
} , 9000);
