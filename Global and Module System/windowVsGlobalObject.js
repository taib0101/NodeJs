// it will not run on terminal in server, because this is client side object
// console.log(window);
// const a = 10;
// console.log(window.a) // output : 10

// this will run in server, because this is global object
// but it doesn't run on browser console
console.log(global);
const a = 10;
console.log(global.a); // undefined

global.setTimeout(() => {
    console.log("Bryan Dahl creator of NodeJS");
}, 2000);

/*
    At client side browser console, if you set var a = 5;
    and see output by window.a , output will show 5. and
    for let a = 5 , window.a will show undefined

    At server side node , will not show output like that.
    for var a = 5. global.a will show undefined


    <script src=index1.js></script>
    <script src=index2.js></script>

    at index1.js file --> I assigned var = 5;
    and at index2.js file --> I assigned var = 10;

    index2.js file will override
*/