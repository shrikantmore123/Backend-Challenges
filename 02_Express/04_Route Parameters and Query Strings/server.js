import "dotenv/config";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/users/:userId",(req, res) => {
    const userId = req.params.userId;
    res.json({
        "message": "User found",
        "userId": userId
    });
});

app.get("/users/:userId/posts/:postId",(req, res) => {
    const userId = req.params.userId;
    const postId = req.params.postId;
    res.json({
        "userId": userId,
        "postId": postId
    });
});

// app.get("/search",(req, res) => {
//     const name = req.query.name;
//     res.json({
//         "name": name
//     });
// });

app.get("/search",(req, res) => {
    const {name, age} = req.query;

    if(name === undefined) {
        return res.status(400).json({
            "error": "Name query parameter is required"
        });
    }

    if(name !== undefined && age === undefined) {
        return res.json({
            "name": name
        });
    }

    if(name !== undefined && age !== undefined) {
        return res.json({
            "name": name,
            "age": age
        });
    }
});

app.use((req, res) => {
    res.status(404).send("404 Page Not Found");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});