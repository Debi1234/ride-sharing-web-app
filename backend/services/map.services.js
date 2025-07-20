const axios = require('axios')
const captainModel = require("../models/captain.model")

module.exports.getAddressCoordinate = async (address) => {
    if (!address) throw new Error('Address is required');
    const apiKey = process.env.GOOGLE_MAPS_API;
    if (!apiKey) throw new Error('Google Maps API key not set in environment variables');
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if (response.data.status !== 'OK' || !response.data.results.length) {
            throw new Error('No results found for the given address');
        }
        const location = response.data.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
    } catch (error) {
        throw new Error('Failed to fetch coordinates: ' + error.message);
    }
}

module.exports.getDistTime = async(origin, dest) => {
    if (!origin || !dest) throw new Error('Origin and destination are required');
    const apiKey = process.env.GOOGLE_MAPS_API;
    if (!apiKey) throw new Error('Google Maps API key not set in environment variables');
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(dest)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if (response.data.status !== 'OK' || !response.data.rows.length || !response.data.rows[0].elements.length) {
            throw new Error('No results found for the given origin and destination');
        }
        const element = response.data.rows[0].elements[0];
        if (element.status !== 'OK') {
            throw new Error('No route found between origin and destination');
        }
        return {
            distance: element.distance,
            duration: element.duration
        };
    } catch (error) {
        throw new Error('Failed to fetch distance and time: ' + error.message);
    }
}

module.exports.getSuggestions = async (input) => {
    if (!input) throw new Error('Input is required');
    const apiKey = process.env.GOOGLE_MAPS_API;
    if (!apiKey) throw new Error('Google Maps API key not set in environment variables');
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if (response.data.status !== 'OK' || !response.data.predictions.length) {
            throw new Error('No suggestions found for the given input');
        }
        // Return an array of suggestion descriptions
        return response.data.predictions.map(prediction => prediction.description);
    } catch (error) {
        throw new Error('Failed to fetch suggestions: ' + error.message);
    }
}

module.exports.getCaptainInRadius = async(ltd,lng,radius) => {
    const captains = await captainModel.find({
        location:{
            $geoWithin:{
                $centerSphere:[[ltd,lng],radius/3963.2]
            }
        }
    })

    return captains
}