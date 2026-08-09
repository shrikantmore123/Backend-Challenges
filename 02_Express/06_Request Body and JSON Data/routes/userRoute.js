import express from "express";

const userRouter = express.Router();

userRouter.post("/", (req, res) => {
    const {name, age, email} = req.body;

    if(name === undefined || age === undefined || email === undefined) {
        return res.status(400).json({
            "error": "Name, age and email are required"
        });
    }
    
    res.status(201).json({
        "message": "User created",
        "user": {
            "name": name,
            "age": age,
            "email": email
        }
    });
});

userRouter.put("/:id", (req, res) => {
    const userId = req.params.id;
    const {name, age} = req.body;

    if(name === undefined || age === undefined) {
        return res.status(400).json({
            "error": "Name and age are required"
        });
    }

    res.status(200).json(
    {
        "message": "User updated",
        "userId": userId,
        "data": {
            "name": name,
            "age": age
        }
    });
});

export default userRouter;