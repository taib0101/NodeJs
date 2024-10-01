/*
    Title : Environment Handler
    Description : Handling environment without Modifying Code
    Author : Mustain Murtaza Taib
    Date : 28/09/2024
*/

// object or scaffolding
const environment = {};

environment.staging = {
    port: 3000,
    environmentName: "staging"
}

environment.production = {
    port: 5000,
    environmentName: "production"
}

const input = process.env.env1;

// checking the object 
const currentEnvironment = typeof input === "string" &&
    typeof environment[input] === "object" ? environment[input] : environment["staging"];

console.log("This directory and file from ./helper/environmentHandler .");


// exporting current object
module.exports = currentEnvironment;