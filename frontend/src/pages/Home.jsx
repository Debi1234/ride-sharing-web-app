import React, { useState, useEffect, useContext } from 'react'
import Locationpanel from '../components/Locationpanel'
import VehicleOptionsPanel from '../components/VehicleOptionsPanel'
import WaitingForDriver from '../components/WaitingForDriver'
import { useSocket } from '../context/SocketContext.jsx'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Home = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [showVehicles, setShowVehicles] = useState(false);
  const [activeInput, setActiveInput] = useState(''); // 'pickup' or 'destination'
  const [confirmedRide, setConfirmedRide] = useState(null);

  const socket = useSocket();
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Socket:', socket);
    console.log('User:', user);
    if (socket && user && user._id) {
      const userType = 'user';
      const userId = user._id;
      console.log('Emitting join event:', { userId, userType });
      socket.emit("join", { userId, userType });
      
      // Listen for join confirmation
      socket.on('joined', (data) => {
        console.log('User joined socket successfully:', data);
        if (data.success) {
          console.log('User socketId updated in database:', data.socketId);
        }
      });
    }
  }, [socket, user]);

  // Listen for ride confirmation
  useEffect(() => {
    if (socket) {
      socket.on('ride-confirmed', (data) => {
        console.log('🎉 RIDE CONFIRMED BY CAPTAIN:', data);
        // Store the confirmed ride data
        setConfirmedRide(data);
        // Hide the vehicle selection panel
        setShowVehicles(false);
      });

      socket.on('ride-started', ride => {
        navigate('/riding', { state: { ride } });
      });

      

      return () => {
        socket.off('ride-confirmed');
        socket.off('ride-started');
      };
    }
  }, [socket, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowVehicles(true);
  };

  const handleBack = () => {
    setShowVehicles(false);
  };

  const handleBackFromWaiting = () => {
    setConfirmedRide(null);
  };

  const handleInputFocus = (inputType) => {
    setIsInputFocused(true);
    setActiveInput(inputType);
  };

  const handleInputBlur = () => {
    // Delay hiding the panel to allow for clicks on suggestions
    setTimeout(() => {
      setIsInputFocused(false);
      setActiveInput('');
    }, 200);
  };

  const handleLocationSelect = (location) => {
    if (activeInput === 'pickup') {
      setPickupLocation(location);
    } else if (activeInput === 'destination') {
      setDestination(location);
    }
  };

  const getCurrentInputValue = () => {
    if (activeInput === 'pickup') {
      return pickupLocation;
    } else if (activeInput === 'destination') {
      return destination;
    }
    return '';
  };

  // If ride is confirmed, show the WaitingForDriver component
  if (confirmedRide) {
    return (
      <div className="relative bg-gray-100 font-sans min-h-screen">
        {/* Map Section */}
        <div className="absolute inset-0" style={{ height: '60vh' }}>
          <LiveTracking mapHeight="60vh" />
        </div>
        {/* Content Section */}
        <div className="relative flex flex-col items-center pt-[55vh]">
          <div className="w-full max-w-md">
            <WaitingForDriver 
              onBack={handleBackFromWaiting}
              rideData={confirmedRide}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-gray-100 font-sans transition-all duration-300 ease-in-out ${isInputFocused ? 'h-screen' : 'min-h-screen'}`}>
      {/* Map Section */}
      <div className="absolute inset-0 transition-all duration-300 ease-in-out" style={{ height: isInputFocused ? '30vh' : '60vh' }}>
        <LiveTracking mapHeight={isInputFocused ? '30vh' : '60vh'} />
      </div>
      {/* Content Section */}
      <div className={`relative flex flex-col items-center transition-all duration-300 ease-in-out ${isInputFocused ? 'pt-[25vh]' : 'pt-[55vh]'}`}>
        {/* Show vehicle options after form submit */}
        {showVehicles ? (
          <div className="w-full max-w-md">
            <VehicleOptionsPanel 
              onBack={handleBack} 
              pickup={pickupLocation}
              destination={destination}
            />
          </div>
        ) : (
          <div className="w-full max-w-md bg-white rounded-t-2xl shadow-lg">
            {/* Find Trip Card */}
            <div className="p-6 space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Find a trip</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Location Inputs */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Add a pick-up location"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    onFocus={() => handleInputFocus('pickup')}
                    onBlur={handleInputBlur}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 border-none text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors pl-10"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-500"></div>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    onFocus={() => handleInputFocus('destination')}
                    onBlur={handleInputBlur}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 border-none text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors pl-10"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-500"></div>
                  {/* Vertical line connecting dots */}
                  <div className="absolute left-4.5 top-1 h-full w-0.5 bg-gray-300 transform -translate-y-full translate-x-px" style={{ height: 'calc(100% + 20px)', top: '-20px', left: '17px' }}></div>
                </div>

                {/* Leave Now Button */}
                <button type="submit" className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-gray-100 border-none text-gray-900 font-medium hover:bg-gray-200 transition-colors">
                  <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span>Leave Now</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-gray-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Location Panel - Shows when input is focused */}
            {isInputFocused && (
              <div className="border-t border-gray-200">
                <Locationpanel 
                  onLocationSelect={handleLocationSelect}
                  inputValue={getCurrentInputValue()}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home