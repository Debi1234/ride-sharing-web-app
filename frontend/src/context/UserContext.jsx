import React, { createContext, useState, useEffect } from 'react'
export const UserDataContext = createContext();

const UserContext = ({ children }) => {
    // Initialize user state from localStorage if available
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
            try {
                return JSON.parse(savedUser)
            } catch (error) {
                console.error('Error parsing saved user data:', error)
                return {
                    email: '',
                    fullname: {
                        firstname: '',
                        lastname: ''
                    }
                }
            }
        }
        return {
            email: '',
            fullname: {
                firstname: '',
                lastname: ''
            }
        }
    });

    // Save user data to localStorage whenever it changes
    useEffect(() => {
        if (user && user._id) {
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            localStorage.removeItem('user')
        }
    }, [user])

    return (
        <UserDataContext.Provider value={{ user, setUser }}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserContext