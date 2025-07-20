import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000';

// Utility function to handle token validation and logout
export const handleTokenError = (error, logoutCallback) => {
    if (error.response && error.response.status === 401) {
        // Clear all auth data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('captain');
        
        // Call logout callback if provided
        if (logoutCallback) {
            logoutCallback();
        }
        
        return true; // Indicates token error was handled
    }
    return false; // No token error
};

// Simple function to get suggestions
export const getSuggestions = async (input) => {
  if (!input || input.length < 3) {
    return { suggestions: [] };
  }
  
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-suggestions`, {
      params: { input },
      headers: {
        'authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get suggestions:', error);
    return { suggestions: [] };
  }
};

export const getFares = async (pickup, destination) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/get-fare`, {
      params: { pickup, destination },
      headers: {
        'authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get fares:', error);
    return null;
  }
};

export const createRide = async (pickup, destination, vehicleType) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/create`,
      { pickup, destination, vehicleType },
      {
        headers: {
          'authorization': `Bearer ${token}`
        }
      }
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Failed to create ride:', error);
    throw error;
  }
}; 