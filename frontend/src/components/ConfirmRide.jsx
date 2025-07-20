import React, { useState } from 'react';
import { createRide } from '../services/api';

const ConfirmRide = ({ selectedVehicle, fare, onBack, onRideCreated, pickup, destination }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirmRide = async () => {
    setIsCreating(true);
    setError(null);
    try {
      const ride = await createRide(pickup, destination, selectedVehicle.key);
      onRideCreated(ride);
    } catch (err) {
      setError('Failed to create ride. Please try again.');
      setIsCreating(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-t-2xl shadow-lg w-full max-w-md">
      {/* Header */}
      <div className="flex items-center mb-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50" disabled={isCreating}>
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="flex-1 text-center text-xl font-semibold text-gray-800">Confirm your ride</h3>
        <div className="w-8"></div>
      </div>
      
      {/* Vehicle Details */}
      <div className="flex items-center space-x-4 mb-4 bg-gray-100 p-4 rounded-lg">
        <span className="text-4xl">{selectedVehicle.icon}</span>
        <div className="flex-1">
          <div className="font-bold text-xl text-gray-900">{selectedVehicle.name}</div>
          <div className="text-sm text-gray-500">
            {selectedVehicle.capacity} {selectedVehicle.capacity > 1 ? 'seats' : 'seat'}
          </div>
        </div>
        <div className="text-2xl font-bold text-gray-900">₹{fare}</div>
      </div>

      {/* Addresses */}
      <div className="mb-4 space-y-3">
        <div>
          <p className="text-xs text-gray-500 uppercase">Pickup</p>
          <p className="font-semibold text-gray-800 truncate">{pickup}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase">Destination</p>
          <p className="font-semibold text-gray-800 truncate">{destination}</p>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
      
      <button
        onClick={handleConfirmRide}
        disabled={isCreating}
        className="w-full bg-black text-white py-3 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 flex items-center justify-center"
      >
        {isCreating ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        ) : (
          `Confirm ${selectedVehicle.name}`
        )}
      </button>
    </div>
  );
};

export default ConfirmRide; 