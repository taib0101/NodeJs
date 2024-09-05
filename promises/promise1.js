// promise use for prevent callback hell
let order = true;

let promise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
        if(order)
            resolve("resolved promise1");
        else
            reject("rejected promise1");
    } , 1000);
});

let promise2 = new Promise((resolve,reject) => {
    setTimeout(() => {
        if(!order)
            reject("rejected promise2");
        else
            resolve("resolved promise2");
    } , 1000);
});

promise1.then((value) => {
    console.log(value);
}).catch((value) => {
    console.log(value);
});

promise2.then((value) => {
    console.log(value);
}).catch((value) => {
    console.log(value);
});