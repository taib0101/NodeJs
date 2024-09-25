// those are exports,require,module,__filename,__dirname contains in Local Scope of
// IIFE(Immediately Invoked Function Expression) or wrapper Function 
/*
    (function(exports,require,module,__filename,__dirname){

    })()
*/
console.log(arguments);
console.log("total arguments :", arguments.length);
console.log(arguments[2] === module);
console.log(arguments[1] === require);