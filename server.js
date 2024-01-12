const dotenv = require('dotenv');
dotenv.config();
const http = require("http");
const app = require('./index.js');

const port = 3007;

const server = http.createServer(app);
server.listen(port, () => {
    console.log('Server is running on port ' + port);
});
