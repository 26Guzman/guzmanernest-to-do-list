import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function Login({ setUser }) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setMessage('')
    setMessageType('')
    setLoading(true)

    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { name, password },
        { withCredentials: true } 
      )

      if (response.data.success) {
        setMessage('✓ Login successful! Redirecting...')
        setMessageType('success')
        setUser(response.data.user)
        setTimeout(() => {
          window.location.href = '/'
        }, 1500)
      } else {
        setMessage(response.data.message || 'Invalid credentials')
        setMessageType('error')
      }
    } catch (error) {
      console.error('Login error:', error)
      setMessage(error.response?.data?.message || 'Login failed. Please try again.')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-400 py-12 px-4">
      <div className="w-full max-w-md">
        {/* Animated card */}
        <div className="bg-white rounded-2xl shadow-2xl p-10 animate-fadeIn">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-center text-gray-500 mb-8 text-sm">
            Sign in to manage your tasks efficiently
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

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block mb-2 font-semibold text-gray-800 text-sm">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
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
                placeholder="Enter your password"
                className="form-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2 py-3"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                'Sign In'
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
            Don't have an account?
            <Link to="/register" className="text-orange-500 font-semibold ml-1 hover:text-orange-600 transition-colors">
              Create one
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

export default Login
