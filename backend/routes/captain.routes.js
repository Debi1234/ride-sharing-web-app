const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const {registerCaptain, loginCaptain, getCaptainProfile, logout} = require('../controllers/captain.controller')
const { authCaptain } = require("../middlewares/auth.middleware")

router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be atleast 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Vehicle color must be atleast 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Vehicle plate must be atleast 3 characters long'),
    body('vehicle.capacity').isNumeric().withMessage('Vehicle capacity must be a number'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
],registerCaptain)

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long')
], loginCaptain)

router.get('/profile', authCaptain, getCaptainProfile)
router.get('/logout', authCaptain, logout)

module.exports = router;