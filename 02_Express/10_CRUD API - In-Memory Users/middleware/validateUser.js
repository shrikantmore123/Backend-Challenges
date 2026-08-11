const validateUser = (req, res, next) => {
    const {name, age, email} = req.body;

    if(name === undefined || age === undefined || email === undefined) {
        return res.status(400).json({
            "error": "Name, age and email are required"
        });
    }

    if(typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({
            "error": "Name must be valid"
        });
    }

    if(typeof age !== "number|| age < 18" ) {
        return res.status(400).json({
            "error": "Age must be valid"
        });
    }

    if(typeof email !== "string" || !email.includes("@")) {
        return res.status(400).json({
            "error": "Email must be valid"
        });
    }

    next();
}

export default validateUser;