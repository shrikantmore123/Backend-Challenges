import express from "express";
import User from "../models/User.js"

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
    const allUsers = await User.find();

    res.status(200).json({
        "message": "Users fetched successfully",
        "users": allUsers
    });
});

userRouter.get("/:id", async (req, res) => {
    const userId = req.params.id;
    
    try {
        const getUser = await User.findById(userId);
        
        if(getUser === null) {
            return res.status(404).json({
                "message": "User not found"
            });
        }
        
        res.status(200).json({
            "message": "User fetched successfully",
            "user": getUser
        });

    } catch (error) {
        console.log("Error while fetching user: ", error);

        return res.status(500).json({
            "message": "Failed to fetch user"
    });
    }
});

userRouter.post("/", async (req, res) => {
    const {name, age, email} = req.body;
    try {
        const user = await User.create({
            name,
            age,
            email
        });
        
        res.status(201).json({
            "message": "User created successfully",
            "user": user
        });
    } catch (error) {
         console.log("Error while creating user: ", error);

        return res.status(500).json({
            "message": "Failed to create user"
        });
    }
});

userRouter.put("/:id", async (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
            new: true,
            runValidators: true
        });
        
        if(updatedUser === null) {
            return res.status(404).json({
                "message": "User not found"
            });
        }
        
        res.status(200).json({
            "message": "User updated successfully",
            "user": updatedUser
        });

    } catch (error) {
        console.log("Error while updating user: ", error);

        return res.status(400).json({
        message: "Failed to update user",
        error: error.message
    });
    }
});
userRouter.delete("/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        
        if(deletedUser === null) {
            return res.status(404).json({
                "message": "User not found"
            });
        }
        
        res.status(200).json({
            "message": "User deleted successfully",
            "user": deletedUser
        });

    } catch (error) {
        console.log("Error while deleting user: ", error);

        return res.status(500).json({
            message: "Failed to delete user"
        });
    }
});

export default userRouter;