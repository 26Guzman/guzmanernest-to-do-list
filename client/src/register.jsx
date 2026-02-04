import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function Register() {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    if (!username.trim()) {
      setMessage('Username is required')
      setMessageType('error')
      return false
    }
    if (!name.trim()) {
      setMessage('Name is required')
      setMessageType('error')
      return false
    }
    if (password.length < 6) {
      setMessage('Password must be at least 6 characters')
      setMessageType('error')
      return false
    }
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      setMessageType('error')
      return false
    }
    return true
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setMessage('')
    setMessageType('')

    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      const response = await axios.post(
        `${API_URL}/register`,
        { username, name, password, confirm: confirmPassword },
        { withCredentials: true }
      )

      if (response.data.success) {
        setMessage('✓ Registration successful! Redirecting to login...')
        setMessageType('success')
        setTimeout(() => {
          window.location.href = '/login'
        }, 1500)
      } else {
        setMessage(response.data.message || 'Registration failed')
        setMessageType('error')
      }
    } catch (error) {
      console.error('Registration error:', error)
      setMessage(
        error.response?.data?.message || 'Registration failed. Please try again.'
      )
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-400 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-10 animate-fadeIn">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Get Started
          </h1>
          <p className="text-center text-gray-500 mb-8 text-sm">
            Create your account and start managing tasks
          </p>

          {message && (
            <div className={`px-4 py-3 rounded-lg mb-6 text-sm font-medium animate-slideIn ${
              messageType === 'success'
                ? 'bg-green-50 border border-green-200 text-green-700'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block mb-2 font-semibold text-gray-800 text-sm">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Choose a username"
                className="form-input"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-800 text-sm">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your full name"
                className="form-input"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-800 text-sm">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Create a password"
                className="form-input"
              />
              <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                <span className={password.length >= 6 ? 'text-green-600' : 'text-gray-400'}>✓</span>
                At least 6 characters
              </p>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-800 text-sm">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your password"
                className="form-input"
              />
              {confirmPassword && password === confirmPassword && (
                <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
                  ✓ Passwords match
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2 py-3 mt-6"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <p className="text-center text-gray-600">
            Already have an account?
            <Link to="/login" className="text-orange-500 font-semibold ml-1 hover:text-orange-600 transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer message */}
        <p className="text-center text-white text-sm mt-6 opacity-90">
          © 2026 TaskFlow. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Register
