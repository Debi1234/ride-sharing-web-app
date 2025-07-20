import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/userLogout'
import { UserDataContext } from './context/UserContext'
import { CaptainDataContext } from './context/CaptainContext'
import Start from './pages/Start'
import CaptainHome from './pages/CaptainHome'
import CaptainLogout from './pages/CaptainLogout'
import CaptainProtectWrapper from './pages/captainProtectWrapper'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
import FinishRide from './components/FinishRide'

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Start />} />

        <Route path='/home' element={<UserProtectWrapper><Home /></UserProtectWrapper>} />
        <Route path='/captain-home' element={
          <CaptainProtectWrapper><CaptainHome /></CaptainProtectWrapper>

        } />
        <Route path='/user/logout' element={<UserProtectWrapper>
          <UserLogout />
        </UserProtectWrapper>} />
        <Route path='/captain/logout' element={<CaptainProtectWrapper><CaptainLogout /></CaptainProtectWrapper>} />

        {/* User Authentication Routes */}
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />

        {/* Captain Authentication Routes */}
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />

        <Route path='/riding' element={<Riding/>} />
        <Route path='/captain-riding' element={<CaptainRiding/>} />
        <Route path='/finish-ride' element={<FinishRide/>} />
      </Routes>
    </div>
  )
}

export default App