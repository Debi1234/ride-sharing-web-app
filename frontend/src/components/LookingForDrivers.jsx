import React from 'react';

const LookingForDrivers = ({ ride, onCancel }) => {
  if (!ride) {
    return null; 
  }

  const { pickup, destination, fare } = ride;

  return (
    <div className="bg-white p-6 rounded-t-2xl shadow-lg w-full max-w-md">
      {/* Header */}
      <div className="text-center text-lg font-semibold text-gray-800 mb-4">Looking for nearby drivers</div>
      
      {/* Car SVG Illustration */}
      <div className="flex justify-center mb-6">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping"></div>
          <div className="absolute inset-2 bg-blue-200 rounded-full animate-ping delay-75"></div>
          <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V7.618a1 1 0 011.447-.894L9 9m0 11V9m0 11h12V9h-3.447l-5.447-2.724A1 1 0 0011 7.172V5a1 1 0 00-1-1H4a1 1 0 00-1 1v12a1 1 0 001 1h5zm0 0l-5.447-2.724" />
            </svg>
          </div>
        </div>
      </div>

      {/* Locations */}
      <div className="mb-4 text-center">
        <div className="mb-3">
          <p className="text-sm text-gray-500">FROM</p>
          <div className="font-semibold text-lg text-gray-900 leading-tight truncate">{pickup}</div>
        </div>
        <div className="mb-3">
          <p className="text-sm text-gray-500">TO</p>
          <div className="font-semibold text-lg text-gray-900 leading-tight truncate">{destination}</div>
        </div>
      </div>
      
      {/* Fare and OTP */}
      <div className="flex items-center justify-between border-t pt-4">
        <div className="text-2xl font-bold text-gray-900">₹{fare}</div>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LookingForDrivers;