import React, { useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainDetails = () => {
  const { captain, isLoading } = useContext(CaptainDataContext);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md mx-auto p-6 text-center">
        <p>Loading captain details...</p>
      </div>
    );
  }

  if (!captain) {
    return (
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md mx-auto p-6 text-center">
        <p>Could not load captain details.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-md mx-auto overflow-hidden">
      {/* Card content */}
      <div className="p-4 pb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Captain"
              className="w-10 h-10 rounded-full mr-3"
            />
            <span className="font-semibold text-lg text-gray-900">
              {captain.fullname.firstname} {captain.fullname.lastname}
            </span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">₹295.20</div>
            <div className="text-xs text-gray-500">Earned</div>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <span className="w-3 h-3 bg-gray-300 rounded-full mr-2 inline-block"></span>
          <span className="text-sm text-gray-500">Online</span>
        </div>
        {/* Stats */}
        <div className="flex justify-between bg-gray-50 rounded-xl p-4 mt-2">
          <div className="flex flex-col items-center flex-1">
            {/* Clock Icon */}
            <svg className="w-7 h-7 mb-1 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
            </svg>
            <div className="font-semibold text-lg text-gray-900">10.2</div>
            <div className="text-xs text-gray-500">Hours Online</div>
          </div>
          <div className="flex flex-col items-center flex-1">
            {/* Gauge Icon */}
            <svg className="w-7 h-7 mb-1 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l3-3m-3 3V7" />
            </svg>
            <div className="font-semibold text-lg text-gray-900">10.2</div>
            <div className="text-xs text-gray-500">Hours Online</div>
          </div>
          <div className="flex flex-col items-center flex-1">
            {/* Book Icon */}
            <svg className="w-7 h-7 mb-1 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 4v16" />
            </svg>
            <div className="font-semibold text-lg text-gray-900">10.2</div>
            <div className="text-xs text-gray-500">Hours Online</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails; 