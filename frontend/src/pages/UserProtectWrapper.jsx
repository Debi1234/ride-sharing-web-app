import React, { useContext, useEffect, useState, useRef } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectWrapper = ({ children }) => {
    const { user, setUser } = useContext(UserDataContext)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const abortControllerRef = useRef(null)

    useEffect(() => {
        if (!token) {
            navigate('/login')
            return
        }

        if (user && user._id) {
            setIsLoading(false)
            return
        }

        if (abortControllerRef.current) {
            abortControllerRef.current.abort()
        }

        abortControllerRef.current = new AbortController()

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                authorization: `Bearer ${token}`
            },
            signal: abortControllerRef.current.signal
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data)
                setIsLoading(false)
            }
        })
        .catch(err => {
            if (axios.isCancel(err)) {
                return
            }
            
            console.error('Profile fetch error:', err)
            if (err.response && err.response.status === 401) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                setUser({
                    email: '',
                    fullname: {
                        firstname: '',
                        lastname: ''
                    }
                })
                navigate('/login')
            } else {
                setIsLoading(false)
            }
        })

        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort()
            }
        }
    }, [token, navigate, setUser, user])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        )
    }

    return <>{children}</>
}

export default UserProtectWrapper