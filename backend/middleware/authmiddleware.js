const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {

    const authHeader = req.headers.authorization;

    console.log("HEADER:", authHeader);
    console.log("SECRET:", process.env.JWT_SECRET);


    if (!authHeader) {
        return res.status(401).json({
            message: "No token, access denied"
        });
    }


    const token = authHeader.split(" ")[1];


    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("DECODED:", decoded);

        req.user = decoded;

        next();


    } catch (error) {

        console.log("JWT ERROR:", error.message);

        return res.status(401).json({
            message: "invalid token"
        });

    }
};


module.exports = protect;