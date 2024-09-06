// using async function means, to act asynchronous in function.
// async function needs to control order of "await function's pomises".
// async uses asychronous methods in synchronous way.
// await only work for async.
// if we don't use await it doesn't execute synchronous function in asynchronous
// function.

let order = true;
let functionn1 = () => {
    const promise = new Promise((resolve,reject) => {
        if(order) resolve("resolved")
        else reject("rejected");
    });
    return promise;
};

let functionn2 = () => {
    return new Promise((resolve,reject) => {
        if(!order) resolve("resolved");
        else reject("rejected");
    });
};

let functionn3 = () => {
    const promise = Promise.resolve("Only resolve not rejection");
    return promise;
};

// calling from asynchronous function as name main
console.log("calling from asynchronous function as name main");
//asynchronous function
async function main () { 
    try {
        const function_x = await functionn1(); // synchronous way
        // const function_y = await functionn2();
        const function_z = await functionn3();
        console.log("function_x : ",function_x); 
        console.log("function_z : ",function_z);
    } catch(error) {
        console.log("function_y : ",error);
    }
}

main();

// calling it by anonymous function
setTimeout(() => {
    console.log();
    console.log("calling from asynchronous anonymous function");
    (async () => {
        try {
            const function_x = await functionn1();
            const function_y = await functionn2();
            const function_z = await functionn3();
            console.log("function_x : ",function_x); 
            console.log("function_z : ",function_z);
        } catch(error) {
            console.log("function_y : ",error);
        }
    }) ();
} , 1000);
