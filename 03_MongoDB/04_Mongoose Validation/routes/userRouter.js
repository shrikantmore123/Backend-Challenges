import express from "express";
import User from "../models/User.js";

const userRouter = express.Router();

userRouter.get("/", async (req, res, next) => {
    try {
        const allUsers = await User.find();

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            count: allUsers.length,
            data: allUsers,
        });
    } catch (error) {
        next(error);
    }
});

userRouter.get("/:id", async (req, res, next) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
});

userRouter.post("/", async (req, res, next) => {
    const {
        name,
        email,
        age,
        role,
        password,
        isActive,
    } = req.body;

    try {
        const user = await User.create({
            name,
            email,
            age,
            role,
            password,
            isActive,
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
});

userRouter.put("/:id", async (req, res, next) => {
    const userId = req.params.id;
    const updateData = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        next(error);
    }
});

userRouter.delete("/:id", async (req, res, next) => {
    const userId = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: deletedUser,
        });
    } catch (error) {
        next(error);
    }
});

export default userRouter;