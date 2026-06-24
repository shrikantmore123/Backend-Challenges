const http = require("http");
const fs = require("fs");
const url = require("url");

const PORT = 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if(pathname === "/log") {
        const message = parsedUrl.query.msg;

        if(!message) {
            res.writeHead(400, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ error: "Message is required" }));
        }

        const logMessage = `[${new Date().toISOString()}] ${message}\n`;

        fs.appendFile("logs.txt", logMessage, (err) => {
            if(err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ error: "Failed to write log" }));
            }

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true, "message": "Log added successfully" }));
        });
    } else if(pathname === "/logs") {
        fs.readFile("logs.txt", "utf-8", (err, data) => {
            if(err) {
                res.writeHead(404, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ error: "No logs found" }));
            }
        
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(data);
        });
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})