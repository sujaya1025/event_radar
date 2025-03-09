const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { verifyToken } = require("../config/jwt"); 
require("dotenv").config();



const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) return res.status(401).json({ message: "Access Denied: No Token Provided" });

    try {
        const verified = verifyToken(token.replace("Bearer ", ""));
        req.user = verified;
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid or Expired Token" });
    }
};

module.exports = authMiddleware;
