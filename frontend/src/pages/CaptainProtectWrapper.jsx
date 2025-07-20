import React, { useContext, useEffect, useRef } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectWrapper = ({
    children
}) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { captain, setCaptain, isLoading, setIsLoading } = useContext(CaptainDataContext)
    const abortControllerRef = useRef(null)

    useEffect(() => {
        if (!token) {
            setIsLoading(false);
            navigate('/captain-login')
            return;
        }

        // If captain data is already available, don't make unnecessary API calls
        if (captain && captain._id) {
            setIsLoading(false);
            return;
        }

        // Cancel any ongoing request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort()
        }

        // Create new abort controller for this request
        abortControllerRef.current = new AbortController()

        setIsLoading(true);
        axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
            headers: {
                authorization: `Bearer ${token}`
            },
            signal: abortControllerRef.current.signal
        }).then(response => {
            if (response.status === 200) {
                setCaptain(response.data);
            }
        })
        .catch(err => {
            // Don't handle errors if request was cancelled
            if (axios.isCancel(err)) {
                return
            }
            
            console.error('Captain profile fetch error:', err)
            // Only logout if it's a 401 error (unauthorized)
            if (err.response && err.response.status === 401) {
                localStorage.removeItem('token')
                localStorage.removeItem('captain')
                setCaptain(null)
                navigate('/captain-login')
            }
        })
        .finally(() => {
            setIsLoading(false);
        });

        // Cleanup function to cancel request on unmount
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort()
            }
        }
    }, [ token, captain, setCaptain, setIsLoading, navigate ]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectWrapper