const { getAddressCoordinate, getDistTime, getSuggestions } = require('../services/map.services');
const { validationResult } = require('express-validator')

module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const address = req.query.address;
        const coords = await getAddressCoordinate(address);
        res.status(200).json({ coordinates: coords });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Failed to get coordinates' });
    }
}

module.exports.getDistTime = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const origin = req.query.origin;
        const destination = req.query.destination;
        const result = await getDistTime(origin, destination);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Failed to get distance and time' });
    }
}

module.exports.getSuggestions = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const input = req.query.input;
        const suggestions = await getSuggestions(input);
        res.status(200).json({ suggestions });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Failed to get suggestions' });
    }
}