import { createContext, useState, useContext, useEffect } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    // Initialize captain state from localStorage if available
    const [ captain, setCaptain ] = useState(() => {
        const savedCaptain = localStorage.getItem('captain')
        if (savedCaptain) {
            try {
                return JSON.parse(savedCaptain)
            } catch (error) {
                console.error('Error parsing saved captain data:', error)
                return null
            }
        }
        return null
    });
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    // Save captain data to localStorage whenever it changes
    useEffect(() => {
        if (captain && captain._id) {
            localStorage.setItem('captain', JSON.stringify(captain))
        } else {
            localStorage.removeItem('captain')
        }
    }, [captain])

    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    };

    const value = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;