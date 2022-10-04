const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {//wrapping inside async handler to handle all the errors
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer") ///token will be a bearer token
    ) {
        try {
            token = req.headers.authorization.split(" ")[1]; // removing the bearer and taking the token

            //decodes token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET); //after taking the token, we are going to verify it

            req.user = await User.findById(decoded.id).select("-password"); //finding the user and returning without the password

            next();
        } catch (error) { //otherwise throwing the error
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if (!token) { //if there is no token
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

module.exports = { protect };