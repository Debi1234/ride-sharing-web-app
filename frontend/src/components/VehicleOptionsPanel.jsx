import React, { useState, useEffect } from 'react';
import { getFares } from '../services/api';
import LookingForDrivers from './LookingForDrivers';
import ConfirmRide from './ConfirmRide';

const vehicles = [
  { name: 'Auto', key: 'auto', icon: '🛺', capacity: 3 },
  { name: 'Moto', key: 'moto', icon: '🛵', capacity: 1 },
  { name: 'Car', key: 'car', icon: '🚗', capacity: 4 },
];

const VehicleOptionsPanel = ({ onBack, pickup, destination }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [fares, setFares] = useState(null);
  const [loadingFares, setLoadingFares] = useState(true);
  const [ride, setRide] = useState(null);

  useEffect(() => {
    const fetchFares = async () => {
      if (pickup && destination) {
        setLoadingFares(true);
        const fetchedFares = await getFares(pickup, destination);
        setFares(fetchedFares);
        setLoadingFares(false);
      }
    };

    fetchFares();
  }, [pickup, destination]);

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  if (ride) {
    return <LookingForDrivers ride={ride} onCancel={() => setRide(null)} />;
  }
  
  if (selectedVehicle) {
    return (
      <ConfirmRide 
        selectedVehicle={selectedVehicle}
        fare={fares[selectedVehicle.key]}
        onBack={() => setSelectedVehicle(null)}
        onRideCreated={setRide}
        pickup={pickup}
        destination={destination}
      />
    );
  }

  return (
    <div className="bg-white p-6 rounded-t-2xl shadow-lg w-full max-w-md">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-gray-800">Choose a ride</h2>
        <div className="w-8"></div>
      </div>

      {loadingFares ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.name}
              onClick={() => handleVehicleSelect(vehicle)}
              className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all bg-gray-100 hover:bg-gray-200`}
            >
              <div className="flex items-center space-x-4">
                <span className="text-3xl">{vehicle.icon}</span>
                <div>
                  <h3 className="font-bold text-lg">{vehicle.name}</h3>
                  <div className="flex items-center space-x-1 text-sm">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                    <span>{vehicle.capacity}</span>
                  </div>
                </div>
              </div>
              <div className="text-lg font-bold">
                {fares && fares[vehicle.key] ? `₹${fares[vehicle.key]}` : '-'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleOptionsPanel; 