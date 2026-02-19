import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Log requests and responses to aid debugging
api.interceptors.request.use(
  (config) => {
    try {
      console.log('[api] Request ->', config.method?.toUpperCase(), config.url, config.data)
    } catch (e) {}
    return config
  },
  (error) => {
    console.error('[api] Request error ->', error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    try {
      console.log('[api] Response <-', response.status, response.config.url, response.data)
    } catch (e) {}
    return response
  },
  (error) => {
    console.error('[api] Response error <-', error?.response ?? error)
    return Promise.reject(error)
  }
)

export default api
