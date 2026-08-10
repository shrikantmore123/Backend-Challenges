import express from "express";

const userRouter = express.Router();

userRouter.get("/:id", async (req, res, next) => {

    const userId = req.params.id;

    const getUser = (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                
                if(id === "500") {
                    const error = new Error("User service failed");
                    reject(error);
                } 

                else if(id === "101") {
                    resolve({ id: id, name: "shrikant" });
                } 

                else {
                    const error = new Error("User not found");
                    error.status = 404;
                    reject(error);
                }

            }, 1000);
        });
    };

    try {
        const user = await getUser(userId);
        
        return res.status(200).json({
            "message": "User fetched successfully",
            "user": user
        });
    } catch(error) {
        return next(error);
    }
    
});

export default userRouter;