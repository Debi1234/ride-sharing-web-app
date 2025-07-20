import React from 'react';

const WaitingForDriver = ({ onBack, rideData }) => {
  // Use actual ride data if available, otherwise fall back to example data
  const driver = rideData?.captain ? {
    name: `${rideData.captain.fullname?.firstname || ''} ${rideData.captain.fullname?.lastname || ''}`.trim() || 'Driver',
    carNumber: rideData.captain.vehicle?.plate || 'MP04 AB 1234',
    carModel: `${rideData.captain.vehicle?.color || ''} ${rideData.captain.vehicle?.vehicleType || ''}`.trim() || 'Vehicle',
    carImage: 'https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg', // Placeholder image
  } : {
    name: 'Driver',
    carNumber: 'MP04 AB 1234',
    carModel: 'Vehicle',
    carImage: 'https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg',
  };

  const pickup = {
    title: rideData?.pickup || 'Pickup Location',
    address: rideData?.pickup || 'Pickup Address',
  };
  
  const drop = {
    title: rideData?.destination || 'Destination',
    address: rideData?.destination || 'Destination Address',
  };
  
  const price = rideData?.fare ? `₹${rideData.fare}` : '₹193.20';

  return (
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-md overflow-hidden relative">
      {/* Close/Back Button */}
      <button
        onClick={onBack}
        className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow z-10"
        aria-label="Close"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      {/* Card info */}
      <div className="p-4 pt-12">
        <div className="flex items-center mb-4">
          <img
            src={driver.carImage}
            alt="Car"
            className="w-14 h-10 object-contain mr-3"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
          />
          <div className="flex-1">
            <div className="font-semibold text-gray-900">{driver.name}</div>
            <div className="font-bold text-lg text-gray-900">{driver.carNumber}</div>
            <div className="text-sm text-gray-500">{driver.carModel}</div>
          </div>
          <span className="w-3 h-3 bg-gray-300 rounded-full ml-2 inline-block"></span>
        </div>
        {/* Locations */}
        <div className="mb-2">
          <div className="flex items-center mb-1">
            <svg className="w-5 h-5 text-gray-700 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4.5 8-10A8 8 0 1 0 4 12c0 5.5 8 10 8 10z" />
            </svg>
            <div>
              <div className="font-bold text-md text-gray-900 leading-tight">Pickup</div>
              <div className="text-sm text-gray-500">{pickup.address}</div>
            </div>
          </div>
          <div className="flex items-center mb-1">
            <svg className="w-5 h-5 text-gray-700 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4.5 8-10A8 8 0 1 0 4 12c0 5.5 8 10 8 10z" />
            </svg>
            <div>
              <div className="font-bold text-md text-gray-900 leading-tight">Destination</div>
              <div className="text-sm text-gray-500">{drop.address}</div>
            </div>
          </div>
        </div>
        {/* Price */}
        <div className="flex items-center justify-between border-t pt-4 mt-2">
          <div className="text-2xl font-bold text-gray-900">{price}</div>
          <div className="text-sm text-gray-500">Cash Cash</div>
        </div>
        
        {/* Ride ID and OTP if available */}
        {rideData && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">
              {/* <div className="flex justify-between mb-1">
                <span>Ride ID:</span>
                <span className="font-mono">{rideData._id}</span>
              </div> */}
              {rideData.otp && (
                <div className="flex justify-between">
                  <span>OTP:</span>
                  <span className="font-mono font-bold text-lg">{rideData.otp}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitingForDriver;