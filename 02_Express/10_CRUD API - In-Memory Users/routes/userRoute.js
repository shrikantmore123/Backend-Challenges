import express from "express";
import users from "../data/users.js";
import validateUser from "../middleware/validateUser.js";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
    res.status(200).json({
    users: users,
    });
});

userRouter.get("/:id", (req, res, next) => {
    const userId = parseInt(req.params.id);
    const userData = users.find((user) => user.id === userId);

    if (userData !== undefined) {
        return res.status(200).json({
            message: "User found successfully",
            user: userData,
        });
    }

    const error = new Error("User not found");
        error.status = 404;
        return next(error);
    });

userRouter.post("/", validateUser, (req, res) => {
    const { name, age, email } = req.body;

    const highestId = users.length > 0 ? Math.max(...users.map((user) => user.id)) : 0;

    const nextId = highestId + 1;

    const newUser = {
        id: nextId,
        name,
        age,
        email,
    };

    users.push(newUser);

    return res.status(201).json({
        message: "User created successfully",
        user: newUser,
    });
});

userRouter.put("/:id", validateUser, (req, res, next) => {
    const userId = parseInt(req.params.id);
    const { name, age, email } = req.body;

    const userData = users.find((user) => user.id === userId);

    if (userData === undefined) {
        const error = new Error("User not found");
        error.status = 404;
        return next(error);
    }

    userData.name = name;
    userData.age = age;
    userData.email = email;

    return res.status(200).json({
        message: "User updated successfully",
        user: userData,
    });
});

userRouter.delete("/:id", (req, res, next) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
        const error = new Error("User not found");
        error.status = 404;
        return next(error);
    }

    const deletedUser = users.splice(userIndex, 1)[0];

    return res.status(200).json({
        message: "User deleted successfully",
        user: deletedUser,
    });
});

export default userRouter;