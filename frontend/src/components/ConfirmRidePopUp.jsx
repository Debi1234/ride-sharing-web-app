import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';

const ConfirmRidePopUp = ({ onClose, onAccept, rideData }) => {
  
  if (!rideData) return null;

  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleAccept = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/ride/start-ride`,
        {
          params: {
            rideId: rideData._id,
            otp: otp
          },
          headers: {
            authorization: token ? `Bearer ${token}` : undefined
          }
        }
      );
      // On success, navigate and save ride to localStorage
      localStorage.setItem('currentRide', JSON.stringify(res.data));
      navigate('/captain-riding', { state: { ride: res.data } });
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to start ride');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full h-full max-w-md mx-auto flex flex-col justify-center items-center p-8 rounded-none shadow-xl">
        <div className="flex flex-col items-center w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Do you want to accept this ride?</h2>
          {/* User info */}
          <div className="flex items-center bg-yellow-100 rounded-xl px-4 py-3 mb-4 w-full max-w-xs">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User"
              className="w-9 h-9 rounded-full mr-3"
            />
            <span className="font-semibold text-gray-900">
              {rideData.user?.fullname?.firstname} {rideData.user?.fullname?.lastname}
            </span>
            <span className="ml-auto font-semibold text-gray-900 text-lg">2.2 KM</span>
          </div>
          {/* Locations */}
          <div className="w-full max-w-xs mb-2">
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
          <div className="flex items-center mb-6 border-t pt-4 mt-2 w-full max-w-xs">
            <svg className="w-5 h-5 text-gray-700 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 6v12" />
            </svg>
            <div>
              <div className="text-lg font-bold text-gray-900">₹{rideData.fare}</div>
              <div className="text-xs text-gray-500">Cash</div>
            </div>
          </div>
          {/* OTP Section */}
          <div className="w-full max-w-xs mb-4">
            <label htmlFor="otp" className="block text-gray-700 font-semibold mb-1">Enter OTP</label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter OTP here"
            />
          </div>
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <button
              className="w-full bg-black text-white py-3 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors shadow"
              onClick={handleAccept}
            >
              Accept Ride
            </button>
            <button
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold text-lg hover:bg-gray-300 transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp; 