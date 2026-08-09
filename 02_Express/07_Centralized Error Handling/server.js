import "dotenv/config";
import express from "express";

import userRouter from "./routes/userRoute.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/users", userRouter);

app.use((req, res) => {
    res.status(404).json({
        "error": "Route not found"
    });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});