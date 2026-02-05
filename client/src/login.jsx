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
        { username: name, password },
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-400 py-6 px-4">
      <div className="w-full max-w-sm">
        {/* Animated card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 animate-fadeIn">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">
            Welcome Back
          </h1>
          <p className="text-center text-gray-500 mb-6 text-xs">
            Sign in to manage your tasks
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

          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="block mb-1 font-semibold text-gray-800 text-xs">
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
              <label className="block mb-1 font-semibold text-gray-800 text-xs">
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
              className="w-full btn-primary disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2 py-2"
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

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <p className="text-center text-gray-600 text-sm">
            Don't have an account?
            <Link to="/register" className="text-orange-500 font-semibold ml-1 hover:text-orange-600 transition-colors">
              Create one
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

export default Login
