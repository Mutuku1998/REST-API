const http = require("http");
const  app = require ('./index.js');
const port = 3003;

const server = http.createServer(app);
server.listen(port);
