//IMPORTS
const http = require('http');

const portNumber = 8888;

http.createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hello World");
    response.end();
}).listen(portNumber);