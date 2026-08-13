import express from "express";
import User from "../models/User.js";

const userRouter = express.Router();

userRouter.post("/", async (req, res) => {
    const {name, age, email} = req.body;

    const user = await User.create({
        name,
        age,
        email
    });

    res.status(201).json({
        "message": "User created successfully",
        "user": user
    });
});

export default userRouter;