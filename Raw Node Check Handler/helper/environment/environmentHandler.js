const environment = {};

environment.staging = {
    port: 3000,
    environmentName: "staging",
    secretKey: "stagingKey"
}

environment.production = {
    port: 5000,
    environmentName: "production",
    secretKey: "productionKey"
}

// storing secret key here is not best practice
// there have many way to store secretKey, i have to know more about hidden file

const input = process.env.env2;

// checking the object 
const currentEnvironment = typeof input === "string" &&
    typeof environment[input] === "object" ? environment[input] : environment["staging"];

console.log("This directory and file from ./helper/environment/environmentHandler .");


// exporting current object
module.exports = currentEnvironment;