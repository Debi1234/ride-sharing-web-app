import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmRidePopUp from './ConfirmRidePopUp';

const RidePopUp = ({ rideData, onClose, onConfirm }) => {
  const [visible, setVisible] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  
  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  if (!visible || !rideData) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-20">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md mx-auto p-6">
          {/* Down arrow */}
          <div className="flex justify-center -mt-6 mb-2">
            <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">New Ride Available!</h2>
          {/* User info */}
          <div className="flex items-center justify-between bg-yellow-200 rounded-xl px-4 py-3 mb-4">
            <div className="flex items-center">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="User"
                className="w-9 h-9 rounded-full mr-3"
              />
              <span className="font-semibold text-gray-900">
                {rideData.user?.fullname?.firstname} {rideData.user?.fullname?.lastname}
              </span>
            </div>
            <span className="font-semibold text-gray-900 text-lg">2.2 KM</span>
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
                <div className="text-sm text-gray-500">{rideData.pickup}</div>
              </div>
            </div>
            <div className="flex items-center mb-1">
              <svg className="w-5 h-5 text-gray-700 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4.5 8-10A8 8 0 1 0 4 12c0 5.5 8 10 8 10z" />
              </svg>
              <div>
                <div className="font-bold text-md text-gray-900 leading-tight">Destination</div>
                <div className="text-sm text-gray-500">{rideData.destination}</div>
              </div>
            </div>
          </div>
          {/* Price */}
          <div className="flex items-center mb-4 border-t pt-4 mt-2">
            <svg className="w-5 h-5 text-gray-700 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 6v12" />
            </svg>
            <div>
              <div className="text-lg font-bold text-gray-900">₹{rideData.fare}</div>
              <div className="text-xs text-gray-500">Cash</div>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button
              className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold text-lg hover:bg-green-600 transition-colors"
              onClick={handleConfirm}
            >
              Confirm
            </button>
            <button
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold text-lg hover:bg-gray-300 transition-colors"
              onClick={handleClose}
            >
              Ignore
            </button>
          </div>
        </div>
      </div>
      {showConfirm && <ConfirmRidePopUp onClose={() => setShowConfirm(false)} onAccept={() => navigate('/captain-riding')} rideData={rideData} onConfirm={onConfirm} />}
    </>
  );
};

export default RidePopUp; 