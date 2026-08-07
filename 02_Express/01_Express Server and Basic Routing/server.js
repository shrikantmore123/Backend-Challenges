import "dotenv/config";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Welcome to Backend Challenges..!");
});

app.get("/about", (req, res) => {
    res.send("About Backend Challenges");
});

app.get("/contact", (req, res) => {
    res.send("Contact us at backend@example.com");
});

app.use((req, res) => {
    res.status(404).send("404 Page Not Found");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});