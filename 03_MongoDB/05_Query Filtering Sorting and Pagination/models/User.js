import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email address",
            ],
        },

        age: {
            type: Number,
            required: true,
            min: 18,
            max: 100,
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
);

const User = mongoose.model("User", userSchema);

export default User;