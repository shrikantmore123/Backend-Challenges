import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("MongoDB connection with Mongoose");
});

app.use((req, res) => {
    res.status(404).send("404 Page Not Found");
});

const startServer = async () => {
    await connectDB();
    
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer();