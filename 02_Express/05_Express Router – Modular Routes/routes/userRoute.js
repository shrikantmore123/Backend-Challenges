import express from "express";
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
    res.json({
        "message": "All users"
    });
});

userRouter.get("/:id", (req, res) => {
    const userId = req.params.id;

    res.json({
        "message": "User found",
        "userId": userId
    });
});

userRouter.post("/", (req, res) => {
    res.status(201).json({
        "message": "User created",
    });
});


userRouter.delete("/:id", (req, res) => {
    const userId = req.params.id;

    res.json({
        "message": "User deleted",
        "userId": userId
    });
});

export default userRouter;