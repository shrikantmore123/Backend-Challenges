import "dotenv/config";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method}  ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    res.send("Welcome to Middleware Challenge");
});

app.get("/about", (req, res) => {
    res.send("This request passed through middleware.");
});

app.get("/admin", (req, res, next) => {
    req.isAdmin = true;
    next();
});

app.get("/admin", (req, res) => {
    res.json({
        "message": "Admin route accessed",
        "isAdmin": req.isAdmin,
    });
});

app.use((req, res) => {
    res.status(404).send("404 Page Not Found");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});