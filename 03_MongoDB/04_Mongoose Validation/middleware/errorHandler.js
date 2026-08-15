const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);

    // 1. Mongoose Validation Error
    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map((error) => ({
            field: error.path,
            message: error.message,
        }));

        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors,
        });
    }

    // 2. Invalid MongoDB ObjectId
    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid user ID",
        });
    }

    // 3. Duplicate Key Error
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];

        return res.status(409).json({
            success: false,
            message: `${field} already exists`,
        });
    }

    // 4. Default / Unknown Error
    const statusCode = err.statusCode || err.status || 500;

    return res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};

export default errorHandler;