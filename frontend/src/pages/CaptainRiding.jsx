import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const CaptainRiding = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let ride = location.state?.ride;

  // Fallback to localStorage if ride is not in navigation state
  if (!ride) {
    const stored = localStorage.getItem('currentRide');
    if (stored) ride = JSON.parse(stored);
  }

  // Debug: print the ride data received
  console.log('Ride data received in CaptainRiding:', ride);

  if (!ride) return <div>No ride data available.</div>;

  const handleFinishRide = () => {
    // Clear ride from localStorage on finish
    localStorage.removeItem('currentRide');
    navigate('/finish-ride', { state: { ride } });
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Map Section (60%) */}
      <div className="flex-shrink-0" style={{ height: '80vh' }}>
        <LiveTracking mapHeight="80vh" />
      </div>
      {/* Content Section (40%) */}
      <div
        className="bg-white rounded-t-2xl shadow-lg w-full max-w-md mx-auto px-6 py-4 flex flex-col justify-center items-center relative"
        style={{ height: '20vh' }}
      >
        <button
          className="w-full max-w-md bg-black text-white py-3 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors shadow"
          onClick={handleFinishRide}
        >
          Complete Ride
        </button>
      </div>
    </div>
  );
};

export default CaptainRiding;