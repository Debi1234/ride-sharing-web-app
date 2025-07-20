import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, {
        email,
        password
      });
      
      if (response.status === 200) {
        console.log('Login successful:', response.data);
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
        // Reset form
        setEmail('');
        setPassword('');
        // Navigate to home page
        navigate('/home');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      // Here you might want to show an error message to the user
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gray-200 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gray-200 rounded-full blur-2xl"></div>

      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to continue your journey</p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <form className="space-y-6" onSubmit={submitHandler}>
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-gray-700 text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-gray-700 text-sm font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors"
                  placeholder="Enter your password"
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors"
              >
                Sign In
              </button>

              {/* Captain Login Button */}
              <Link to="/captain-login">
                <button
                  type="button"
                  className="w-full border-2 border-gray-900 text-gray-900 py-3 rounded-lg font-semibold text-lg hover:bg-gray-900 hover:text-white transition-colors"
                >
                  Sign In as Captain
                </button>
              </Link>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-gray-900 font-semibold hover:text-gray-700">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
