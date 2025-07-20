import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FinishRide = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ride = location.state?.ride;

  if (!ride) return <div>No ride data available.</div>;

  const handleFinish = () => {
    async function endRide(){
      try {
        console.log(ride._id)
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/end-ride`,{
          rideId:ride._id
        },{
          headers:{
            authorization:`Bearer ${localStorage.getItem('token')}`
          }
        })

        if(res.status===200){
          navigate('/captain-home'); // or another page if you prefer
        }
      } catch (error) {
        console.error('Error finishing ride:', error, error?.response?.data);
        alert(error?.response?.data?.message || 'Failed to finish ride');
      }
    }
    endRide();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Content Section (Full Screen) */}
      <div className="flex-1 bg-white rounded-t-3xl shadow-2xl relative z-20">
        <div className="px-6 py-6">
          {/* Success Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Ride Completed Successfully!</h1>
            <p className="text-gray-600">Thank you for choosing our service</p>
          </div>

          {/* Ride Summary Card */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Ride Summary</h3>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">₹{ride.fare}</div>
                <div className="text-xs text-gray-500">Total Fare</div>
              </div>
            </div>
            
            {/* Route Info */}
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">Pickup</p>
                  <p className="text-xs text-gray-600 break-words leading-relaxed">{ride.pickup}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">Destination</p>
                  <p className="text-xs text-gray-600 break-words leading-relaxed">{ride.destination}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Passenger Info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {ride.user?.fullname?.firstname} {ride.user?.fullname?.lastname}
                </h3>
                <p className="text-sm text-gray-600">Passenger</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono font-bold text-gray-900">{ride.otp}</div>
                <div className="text-xs text-gray-500">OTP</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors flex items-center justify-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View Receipt
            </button>
            <button 
              onClick={handleFinish}
              className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Finish Ride
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;