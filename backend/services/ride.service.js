const rideModel = require('../models/ride.model')
const { getDistTime } = require('../services/map.services')
const crypto = require('crypto');
const { sendMessageToSocket } = require('../socket');


async function getfare(pickup, destination, vehicleType) {
    // Example rates (can be adjusted or moved to config)
    const VEHICLE_RATES = {
        car: { base: 100, perKm: 20 },
        moto: { base: 50, perKm: 10 },
        auto: { base: 70, perKm: 15 }
    };
    /**
     * Calculate fare based on vehicle type, pickup, and destination
     * @param {string} pickup
     * @param {string} destination
     * @param {string} vehicleType - 'car' | 'motorcycle' | 'auto'
     * @returns {Object} { fare, distance, duration }
     */
    if (!VEHICLE_RATES[vehicleType]) throw new Error('Invalid vehicle type');
    const { distance } = await getDistTime(pickup, destination);
    // distance.value is in meters (Google API), convert to km
    const km = distance.value / 1000;
    const rate = VEHICLE_RATES[vehicleType];
    const fare = Math.round(rate.base + rate.perKm * km);
    return fare;
}

async function getAllFares(pickup, destination) {
    const carFare = await getfare(pickup, destination, 'car');
    const motoFare = await getfare(pickup, destination, 'moto');
    const autoFare = await getfare(pickup, destination, 'auto');
    return {
        car: carFare,
        moto: motoFare,
        auto: autoFare,
    };
}

module.exports = { getfare, getAllFares };

module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
    const fare = await getfare(pickup, destination, vehicleType);
    // Generate a secure 6-digit numeric OTP using crypto
    const otp = (await crypto.randomInt(100000, 1000000)).toString();
    const ride = new rideModel({
        user,
        pickup,
        destination,
        fare,
        otp
    });
    await ride.save();
    return ride;
}

module.exports.confirmRide = async ({ rideId, captain }) => {
    try {
        // Find the ride and update it with captain info
        const updatedRide = await rideModel.findByIdAndUpdate(
            rideId,
            {
                captain: captain._id,
                status: 'accepted'
            },
            { new: true } // Return the updated document
        ).populate('user').populate('captain').select('+otp');

        if (!updatedRide) {
            throw new Error('Ride not found');
        }
        console.log(updatedRide);

        return updatedRide;
    } catch (error) {
        throw new Error(`Failed to confirm ride: ${error.message}`);
    }
};

module.exports.startRide = async ({ rideId, otp, captain }) => {
    // Find the ride by ID and captain
    const ride = await rideModel.findOne({ _id: rideId }).select('+otp');
    if (!ride) {
        throw new Error('Ride not found or you are not the assigned captain');
    }

    // Check OTP
    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    // Update ride status to 'started'
    ride.status = 'ongoing';
    await ride.save();

    // Populate user and captain for response
    await ride.populate('user');
    await ride.populate('captain');

    /*sendMessageToSocket(ride.user.socketId,'ride-started',ride)*/

    return ride;
};

module.exports.endRide = async({rideId, captain}) => {
    if(!rideId){
        throw new Error('Ride id is required')
    }

    // Support both object and string for captain
    // const captainId = captain && captain._id ? captain._id : captain;

    const ride = await rideModel.findOne({
        _id: rideId,
        // captain: captain
    }).populate('user').populate('captain').select('+otp');

    if(!ride){
        throw new Error('Ride not found')
    }

    if(ride.status!='ongoing'){
        throw new Error('Ride not ongoing')
    }

    // Update status
    ride.status = 'completed';
    await ride.save();

    // Return the updated ride
    return ride;
}