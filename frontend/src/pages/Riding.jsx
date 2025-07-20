import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketContext.jsx'
import LiveTracking from '../components/LiveTracking';

const Riding = () => {
  const location = useLocation();
  const socket = useSocket();
  const navigate = useNavigate();
  let ride = location.state?.ride;
  if (!ride) {
    const stored = localStorage.getItem('currentRide');
    if (stored) ride = JSON.parse(stored);
  }
  if (!ride) return <div>No ride data available.</div>;

  socket.on('ride-ended',()=>{
    navigate('/home')
  })

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Map Section (75%) */}
      <div className="flex-shrink-0 relative" style={{ height: '60vh' }}>
        <LiveTracking mapHeight="60vh" />
        
        {/* Status Bar Overlay */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/20 to-transparent h-20 z-10">
          <div className="flex items-center justify-between px-6 pt-8">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-white font-semibold text-lg">Ride in Progress</span>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-gray-800 font-medium text-sm">Live Tracking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section (25%) */}
      <div className="flex-1 bg-white rounded-t-3xl shadow-2xl relative z-20">
        <div className="px-6 py-6">
          {/* Ride Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Pickup Location */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-gray-700">Pickup</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{ride.pickup}</p>
            </div>

            {/* Destination */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-gray-700">Destination</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{ride.destination}</p>
            </div>
          </div>

          {/* Driver & Vehicle Info */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {ride.captain?.fullname?.firstname} {ride.captain?.fullname?.lastname}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {ride.captain?.vehicle?.color} {ride.captain?.vehicle?.vehicleType}
                  </p>
                  <p className="text-xs text-gray-500 font-mono">
                    {ride.captain?.vehicle?.plate}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">₹{ride.fare}</div>
                <div className="text-xs text-gray-500">Total Fare</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors flex items-center justify-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Driver
            </button>
            <button className="flex-1 bg-black text-white py-3 rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors flex items-center justify-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Riding;