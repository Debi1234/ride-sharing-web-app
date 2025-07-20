import React, { useEffect, useState, useCallback } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: 28.6139, // Default to New Delhi
  lng: 77.2090,
};

const LiveTracking = ({ mapHeight = '70vh' }) => {
  const [position, setPosition] = useState(defaultCenter);

  // Function to update position from geolocation
  const updatePosition = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          // If denied or error, fallback to default
          setPosition(defaultCenter);
        }
      );
    } else {
      setPosition(defaultCenter);
    }
  }, []);

  useEffect(() => {
    updatePosition(); // Get initial position
    const interval = setInterval(updatePosition, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, [updatePosition]);

  return (
    <div style={{ width: '100%', height: mapHeight }}>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={15}
        >
          <Marker position={position} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default LiveTracking;