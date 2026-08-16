import express from "express";
import User from "../models/User.js";

const userRouter = express.Router();

userRouter.get("/", async (req, res, next) => {
    const {
        role,
        minAge,
        maxAge,
        isActive,
        sort,
        page = 1,
        limit = 10,
    } = req.query;

    try {
        const query = {};

        if (role) {
            if (!["user", "admin"].includes(role)) {
                const error = new Error(
                    "Role must be either user or admin"
                );
                error.statusCode = 400;
                throw error;
            }

            query.role = role;
        }

        if (minAge !== undefined) {
            const min = Number(minAge);

            if (Number.isNaN(min)) {
                const error = new Error(
                    "minAge must be a valid number"
                );
                error.statusCode = 400;
                throw error;
            }

            query.age = {
                ...query.age,
                $gte: min,
            };
        }

        if (maxAge !== undefined) {
            const max = Number(maxAge);

            if (Number.isNaN(max)) {
                const error = new Error(
                    "maxAge must be a valid number"
                );
                error.statusCode = 400;
                throw error;
            }

            query.age = {
                ...query.age,
                $lte: max,
            };
        }

        if (isActive !== undefined) {
            if (isActive !== "true" && isActive !== "false") {
                const error = new Error(
                    "isActive must be true or false"
                );
                error.statusCode = 400;
                throw error;
            }

            query.isActive = isActive === "true";
        }

        const currentPage = Number(page);
        const currentLimit = Number(limit);

        if (
            !Number.isInteger(currentPage) ||
            currentPage < 1
        ) {
            const error = new Error(
                "page must be a positive integer"
            );
            error.statusCode = 400;
            throw error;
        }

        if (
            !Number.isInteger(currentLimit) ||
            currentLimit < 1
        ) {
            const error = new Error(
                "limit must be a positive integer"
            );
            error.statusCode = 400;
            throw error;
        }

        const skip = (currentPage - 1) * currentLimit;

        let sortOption = {};

        if (sort) {
            const sortField = sort.startsWith("-")
                ? sort.substring(1)
                : sort;

            if (!["name", "age"].includes(sortField)) {
                const error = new Error(
                    "sort must be name, -name, age, or -age"
                );
                error.statusCode = 400;
                throw error;
            }

            sortOption[sortField] = sort.startsWith("-") ? -1 : 1;
        }

        const totalUsers = await User.countDocuments(query);

        const users = await User.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(currentLimit);

        const totalPages = Math.ceil(
            totalUsers / currentLimit
        );

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            count: users.length,
            page: currentPage,
            limit: currentLimit,
            totalUsers,
            totalPages,
            data: users,
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
        const newUser = await User.create({
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
            data: newUser,
        });
    } catch (error) {
        next(error);
    }
});

export default userRouter;