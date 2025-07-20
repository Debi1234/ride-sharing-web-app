const express = require('express');
const router = express.Router();
const {body, query}= require('express-validator')
const {createRide, getFare, confirmRide,startRide,endRide} = require('../controllers/ride.controller')
const {authUser,authCaptain}=require('../middlewares/auth.middleware')

router.post('/create',
    authUser,
    body('pickup').notEmpty().withMessage('Pickup location is required'),
    body('destination').notEmpty().withMessage('Destination is required'),
    body('vehicleType').notEmpty().withMessage('Vehicle type is required').isIn(['car', 'auto', 'moto']).withMessage('Invalid vehicle type'),
    createRide
)

router.get('/get-fare',
    authUser,
    query('pickup').notEmpty().withMessage('Pickup location is required'),
    query('destination').notEmpty().withMessage('Destination is required'),
    getFare
)

router.post('/confirm',
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    // body('otp').isString().isLength({min:4,max:6}).withMessage('Invalid OTP'),
    confirmRide
)

router.get('/start-ride',
    authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({min:4,max:6}).withMessage('Invalid OTP'),
    startRide

)

router.post('/end-ride',
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    endRide
)

module.exports = router