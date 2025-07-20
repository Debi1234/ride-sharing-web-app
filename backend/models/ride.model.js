const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Captain',
    // required: true
  },
  pickup: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  fare: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'completed', 'ongoing', 'cancelled'],
    default: 'pending',
    // required: true
  },
  duration: {
    type: Number, // duration in minutes or seconds, clarify as needed
    // required: true
  },
  distance: {
    type: Number, // distance in kilometers or meters, clarify as needed
    // required: true
  },
  paymentID: {
    type: String
  },
  orderID: {
    type: String
  },
  signature: {
    type: String
  },
  otp:{
    type:String,
    select:false
  }
}, { timestamps: true });

module.exports = mongoose.model('Ride', rideSchema);
