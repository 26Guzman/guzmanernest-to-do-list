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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-400 py-6 px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-2xl p-6 animate-fadeIn">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">
            Get Started
          </h1>
          <p className="text-center text-gray-500 mb-6 text-xs">
            Create your account and start managing
          </p>

          {message && (
            <div className={`px-3 py-2 rounded-lg mb-4 text-xs font-medium animate-slideIn ${
              messageType === 'success'
                ? 'bg-green-50 border border-green-200 text-green-700'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-3">
            <div>
              <label className="block mb-1 font-semibold text-gray-800 text-xs">
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
              <label className="block mb-1 font-semibold text-gray-800 text-xs">
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
              <label className="block mb-1 font-semibold text-gray-800 text-xs">
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
              <label className="block mb-1 font-semibold text-gray-800 text-xs">
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
              className="w-full btn-primary disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2 py-2 mt-4"
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

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <p className="text-center text-gray-600 text-sm">
            Already have an account?
            <Link to="/login" className="text-orange-500 font-semibold ml-1 hover:text-orange-600 transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer message */}
        <p className="text-center text-white text-xs mt-4 opacity-90">
          © 2026 TaskFlow. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Register
