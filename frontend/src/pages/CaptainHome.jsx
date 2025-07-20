import React, { useState, useEffect, useContext } from 'react';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { useSocket } from '../context/SocketContext.jsx';
import { CaptainDataContext } from '../context/CaptainContext.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const CaptainHome = () => {
  const [incomingRide, setIncomingRide] = useState(null);
  const [showConfirmRide, setShowConfirmRide] = useState(false);
  const [confirmedRide, setConfirmedRide] = useState(null);
  const socket = useSocket();
  const { captain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Socket in CaptainHome:', socket);
    console.log('Captain in CaptainHome:', captain);
    if (socket && captain && captain._id) {
      const userType = 'captain';
      const userId = captain._id;
      console.log('Emitting join event (captain):', { userId, userType });
      socket.emit('join', { userId, userType });
    }
  }, [socket, captain]);

  // Emit location update every 10 seconds using real geolocation
  useEffect(() => {
    if (socket && captain && captain._id) {
      const sendLocation = (ltd, lng) => {
        console.log('Sending update-location-captain:', { captainId: captain._id, ltd, lng });
        socket.emit('update-location-captain', { captainId: captain._id, ltd, lng });
      };

      const interval = setInterval(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const ltd = position.coords.latitude;
              const lng = position.coords.longitude;
              sendLocation(ltd, lng);
            },
            (error) => {
              // Fallback to dummy values if permission denied or error
              console.warn('Geolocation error:', error);
              sendLocation(28.6139, 77.2090);
            }
          );
        } else {
          // Fallback if geolocation is not supported
          sendLocation(28.6139, 77.2090);
        }
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [socket, captain]);

  // Listen for new ride requests
  useEffect(() => {
    if (socket) {
      socket.on('new-ride', (rideData) => {
        console.log('🎯 NEW RIDE REQUEST RECEIVED:', rideData);
        setIncomingRide(rideData);
        setShowConfirmRide(false); // Reset confirm ride state
      });

      return () => {
        socket.off('new-ride');
      };
    }
  }, [socket]);

  const handleCloseRidePopUp = () => {
    setIncomingRide(null);
    setShowConfirmRide(false);
  };

  async function confirmRide() {
    try {
      if (!incomingRide || !captain) {
        console.error('No ride or captain data available');
        return;
      }
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ride/confirm`,
        {
          rideId: incomingRide._id,
          captainId: captain._id
        },
        {
          headers: {
            authorization: token ? `Bearer ${token}` : undefined
          }
        }
      );
      setConfirmedRide(response.data); // store the confirmed ride
      setShowConfirmRide(true);
    } catch (error) {
      console.error('Error confirming ride:', error);
      alert('Failed to confirm ride. Please try again.');
    }
  }

  const handleAcceptRide = (ride) => {
    setShowConfirmRide(false);
    navigate('/captain-riding', { state: { ride } });
    setIncomingRide(null);
    setConfirmedRide(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top 50%: Map */}
      <div className="flex-1 relative" style={{ height: '65vh' }}>
        <LiveTracking mapHeight="65vh" />
      </div>
      {/* Bottom 50%: Card */}
      <div className="flex-1 flex items-center justify-center z-10 relative">
        <div className="h-1/1 w-full flex items-center justify-center" style={{ height: '35vh' }}>
          <CaptainDetails />
        </div>
      </div>
      {incomingRide && !showConfirmRide && <RidePopUp rideData={incomingRide} onClose={handleCloseRidePopUp} onConfirm={confirmRide} />}
      {incomingRide && showConfirmRide && <ConfirmRidePopUp rideData={incomingRide} onClose={handleCloseRidePopUp} onAccept={() => handleAcceptRide(confirmedRide)} />}
    </div>
  );
};

export default CaptainHome;