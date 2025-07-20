import React, { useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'

const UserLogout = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { setUser } = useContext(UserDataContext)

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`,{
        headers:{
            authorization:`Bearer ${token}`
        }
    }).then((res)=>{
        if(res.status===200){
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
        }
    }).catch((error) => {
        console.error('Logout error:', error)
        // Even if the API call fails, clear local data
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
    })
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  )
}

export default UserLogout