const userModel = require("../models/user.model")
const captainModel = require("../models/captain.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const BlacklistedToken = require("../models/blacklistedToken.model")

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        // Check if token is blacklisted
        const blacklistedToken = await BlacklistedToken.findOne({ token });
        if (blacklistedToken) {
            return res.status(401).json({ message: 'Unauthorized: Token has been invalidated' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        // Check if token is blacklisted
        const blacklistedToken = await BlacklistedToken.findOne({ token });
        
        if (blacklistedToken) {
            return res.status(401).json({ message: 'Unauthorized: Token has been invalidated' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const captain = await captainModel.findById(decoded._id);

        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized: Captain not found' });
        }

        // Check if captain is active
        // if (captain.status !== 'active') {
        //     return res.status(401).json({ message: 'Unauthorized: Captain account is inactive' });
        // }

        req.captain = captain;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}