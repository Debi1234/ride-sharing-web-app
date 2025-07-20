const rideModel = require("../models/ride.model");
const { validationResult } = require('express-validator');
const {createRide,getAllFares,captainsInradius,confirmRide,startRide,endRide}=require('../services/ride.service')
const { getAddressCoordinate, getCaptainInRadius } = require('../services/map.services');
const {sendMessageToSocket} = require('../socket')

module.exports.createRide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {pickup,destination,vehicleType} = req.body;
        const ride = await createRide({
            user:req.user._id,
            pickup,
            destination,
            vehicleType
        });
        res.status(201).json(ride);
        
        // Get coordinates and find captains in radius
        const picupcoords = await getAddressCoordinate(pickup)
        console.log(picupcoords)
        const captainsInradius = await getCaptainInRadius(picupcoords.lat,picupcoords.lng,2)
        console.log(captainsInradius)

        ride.otp=""

        // Send new-ride event to all captains found
        console.log(`Found ${captainsInradius.length} captains in radius`);
        captainsInradius.forEach(async (captain, index) => {
            if (captain.socketId) {
                console.log(`Sending new-ride to captain ${index + 1}: ${captain.socketId}`);
                const populatedRide = await rideModel.findById(ride._id).populate('user');
                const success = sendMessageToSocket(captain.socketId, 'new-ride', populatedRide);
                console.log(`Message sent to captain ${index + 1}: ${success ? 'SUCCESS' : 'FAILED'}`);
            } else {
                console.log(`Captain ${index + 1} has no socketId`);
            }
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message || 'Failed to create ride' });
    }
}

module.exports.getFare = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {pickup,destination} = req.query;
        const fares = await getAllFares(pickup, destination);
        res.status(200).json(fares);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Failed to get fares' });
    }
}

module.exports.confirmRide = async(req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const {rideId} = req.body;
        const ride = await confirmRide({ rideId, captain: req.captain });

        console.log('Ride confirmed, user socketId:', ride.user.socketId);
        
        if (ride.user.socketId) {
          const success = sendMessageToSocket(ride.user.socketId, 'ride-confirmed', ride);
          console.log('Socket message sent to user:', success ? 'SUCCESS' : 'FAILED');
        } else {
          console.log('User has no socketId, cannot send notification');
        }

        return res.status(200).json(ride)
    } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to confirm ride' });
    }
}

module.exports.startRide = async(req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {rideId,otp} = req.query;

    try {
        const ride = await startRide({
            rideId,
            otp,
            captain:res.captain
        })

        sendMessageToSocket(ride.user.socketId,'ride-started',ride);

        return res.status(200).json(ride)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

module.exports.endRide =async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {rideId}=req.body
    console.log(rideId)
    try {
        const ride = await endRide({rideId,captain:res.captain})
        sendMessageToSocket(ride.user.socketId,'ride-ended',ride)
        return res.status(200).json(ride);
    } catch (error) {
        return res.status(500).json({message:error.message})   
    }
}
