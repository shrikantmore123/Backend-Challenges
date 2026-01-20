const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
    const url = req.url;

    console.log(url);

    if(url === "/") {
        res.writeHead(200, {'content-type':'text/plain'});
        res.end("Backend Challenges Started");
    }
    else if (url === "/health") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: "OK" }));
    }
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});