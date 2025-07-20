import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {
  const [formData, setFormData] = useState({
    fullname: {
      firstname: '',
      lastname: ''
    },
    email: '',
    password: ''
  })

  const navigate = useNavigate()
  const { user, setUser } = useContext(UserDataContext)


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, formData);
      if (response.status === 201) {
        console.log('Registration successful:', response.data);
        setUser(response.data.user);
        localStorage.setItem('token',response.data.token)
        // Reset form after successful registration
        setFormData({
          fullname: {
            firstname: '',
            lastname: ''
          },
          email: '',
          password: ''
        });
        // Navigate to home page after successful registration
        navigate('/home');
      }
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      // Here you might want to show an error message to the user
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'firstname' || name === 'lastname') {
      setFormData(prev => ({
        ...prev,
        fullname: {
          ...prev.fullname,
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
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
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Create Account</h1>
            <p className="text-gray-600">Join us for a better ride experience</p>
          </div>

          {/* Signup Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <form className="space-y-6" onSubmit={submitHandler}>
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                {/* First Name Input */}
                <div className="space-y-2">
                  <label className="text-gray-700 text-sm font-medium">First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.fullname.firstname}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors"
                    placeholder="Enter first name"
                  />
                </div>

                {/* Last Name Input */}
                <div className="space-y-2">
                  <label className="text-gray-700 text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.fullname.lastname}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-gray-700 text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-gray-700 text-sm font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors"
                  placeholder="Create a password"
                />
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors"
              >
                Create Account
              </button>

              {/* Captain Signup Button */}
              <Link to="/captain-signup">
                <button
                  type="button"
                  className="w-full border-2 border-gray-900 text-gray-900 py-3 rounded-lg font-semibold text-lg hover:bg-gray-900 hover:text-white transition-colors"
                >
                  Sign Up as Captain
                </button>
              </Link>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-gray-900 font-semibold hover:text-gray-700">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserSignup