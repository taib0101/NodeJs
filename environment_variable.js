// Environment variable is a variable where it set from outside of application.
// It helps to application configuration without modifying code
// you can get environment variable inside application by using this "process.env.env1"
// 3000 is for staging and 5000 is for production

// go to terminal and prompt env1=staging env2=production [node|nodemon] environment_variable.js, and you can give multiple variable from outside

// there have other option to run it 

let port = process.env.env1 === "staging" ? 3000 : 5000;

const http = require("http");
const url = require("url");

const server = http.createServer((request,response) => {
  response.end();
});

server.listen(port,() => {
  console.log(`listening server at port ${port} ...`);
});
