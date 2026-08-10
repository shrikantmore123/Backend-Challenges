import express from "express";
import validateUser from "../middlewares/validateUser.js";

const userRouter = express.Router();

userRouter.post("/", validateUser, (req, res, next) => {
    const {name, age, email} = req.body;

    return res.status(201).json({
        "message": "User created successfully",
        "user": {
            "name": name,
            "age": age,
            "email": email
        }
    });
});

export default userRouter;