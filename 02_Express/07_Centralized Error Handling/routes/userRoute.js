import express from "express";

const userRouter = express.Router();

userRouter.get("/error", (req, res, next) => {
    const error = new Error("Something went wrong");
    next(error);
});

userRouter.get("/404", (req, res, next) => {
    const error = new Error("User not found");
    error.status = 404;
    next(error);
});

userRouter.get("/:id", (req, res) => {
    const userId = req.params.id;

    res.json({
        "message": "User found",
        "userId": userId
    });
});

export default userRouter;