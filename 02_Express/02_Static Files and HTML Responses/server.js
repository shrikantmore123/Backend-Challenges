import "dotenv/config";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.use((req, res) => {
    res.status(404).send("404 Page Not Found")
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});