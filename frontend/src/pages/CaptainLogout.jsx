import React, { useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainLogout = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { setCaptain } = useContext(CaptainDataContext)

    axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logout`,{
        headers:{
            authorization:`Bearer ${token}`
        }
    }).then((res)=>{
        if(res.status===200){
            localStorage.removeItem('token')
            localStorage.removeItem('captain')
            setCaptain(null)
            navigate('/captain-login')
        }
    }).catch((error) => {
        console.error('Captain logout error:', error)
        // Even if the API call fails, clear local data
        localStorage.removeItem('token')
        localStorage.removeItem('captain')
        setCaptain(null)
        navigate('/captain-login')
    })
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  )
}

export default CaptainLogout