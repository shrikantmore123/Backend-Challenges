import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 2,
        },  
        age: {
            type: Number,
            required: true,
            min: 18,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        
        createdAt:{
            type: Date,
            default: Date.now
        } 
    }, 
);

const User = mongoose.model("User", userSchema);

export default User;