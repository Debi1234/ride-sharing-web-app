const captainModel = require("../models/captain.model")
const {createCaptain} = require("../services/captain.service")
const { validationResult } = require("express-validator");
const BlacklistedToken = require('../models/blacklistedToken.model');

module.exports.registerCaptain = async(req,res,next)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    } 

    try {
        const { fullname, email, password, vehicle } = req.body;

        // Check if captain already exists
        const existingCaptain = await captainModel.findOne({ email });
        if (existingCaptain) {
            return res.status(400).json({
                success: false,
                message: "Captain with this email already exists"
            });
        }

        const hashPassword = await captainModel.hashPassword(password);

        const captain = await createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });

        const token = captain.generateAuthToken();
        res.status(201).json({ token, captain });
    } catch (error) {
        next(error);
    }
}

module.exports.loginCaptain = async(req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    try {
        const { email, password } = req.body;

        const captain = await captainModel.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(400).json({ 
                success: false,
                message: 'Captain not found' 
            });
        }

        const isPasswordValid = await captain.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid password' 
            });
        }

        const token = captain.generateAuthToken();
        res.cookie('token', token);

        res.status(200).json({ 
            success: true,
            token, 
            captain 
        });
    } catch (error) {
        next(error);
    }
}

module.exports.getCaptainProfile = async(req,res,next) => {
    res.status(200).json(req.captain);
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



