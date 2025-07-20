const userModel = require('../models/user.model')
const { createUser } = require('../services/user.service')
const { validationResult } = require("express-validator");
const BlacklistedToken = require('../models/blacklistedToken.model');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const { fullname, email, password } = req.body;
    const hashPassword = await userModel.hashPassword(password);

    const existingUser = await userModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
    }

    const user = await createUser({
        firstname: fullname.firstname, lastname: fullname.lastname, email: email.toLowerCase(), password: hashPassword
    })

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
}

module.exports.loginUser = async(req,res,next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({email}).select('+password');
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
    }

    const token = user.generateAuthToken();
    res.cookie('token', token);

    res.status(200).json({ token, user });
}

module.exports.getUserProfile = async(req,res,next) => {
    res.status(200).json(req.user);
}

module.exports.logout = async(req, res, next) => {
    try {
        const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
        
        if (!token) {
            return res.status(400).json({ message: 'No token found' });
        }

        // Add token to blacklist
        await BlacklistedToken.create({ token });

        // Clear the token cookie
        res.clearCookie('token');

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        next(error);
    }
}