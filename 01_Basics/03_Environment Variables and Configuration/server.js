// require("dotenv").config();
// const http = require("http");

import "dotenv/config";
import http from "http";

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME;
const NODE_ENV = process.env.NODE_ENV;

const server = http.createServer((req, res) => {
    const url = req.url;

    if(url === "/") {
        res.writeHead(200, {"content-type" : "text/plain"});
        res.end(`Welcome to ${APP_NAME}`);
    } else if(url === "/config") {
        res.writeHead(200, {"content-type" : "application/json"})
        res.end(JSON.stringify({
            "appName": APP_NAME,
            "environment": NODE_ENV,
            "port": PORT
        }));
    } else {
        res.writeHead(404, {"content-type" : "text/plain"});
        res.end("404 Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});