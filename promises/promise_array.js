let order = true;
let arr = [];
let obj = {
    functionn : () => {
        let promise = new Promise((resovle,reject) => {
            setTimeout(() => {
                if(order) resovle("resolved");
                else reject("rejected"); 
            }, 1000);
        });
        return promise;
    }
}

for(let i = 1; i <= 6; ++i) arr.push(obj);

arr[0].functionn()
    .then(arr[1].functionn)
    .then(arr[2].functionn)
    .then(arr[3].functionn)
    .then(arr[4].functionn)
    .then(arr[5].functionn)
    .then((value) => {
        console.log(value);
    })
    .catch((value) => {
        console.log(value);
    });