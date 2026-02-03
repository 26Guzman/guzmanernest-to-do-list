import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()

  return (
    <header className="bg-orange-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">To-Do App</h1>
        </div>
        <nav className="flex gap-4">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 hover:bg-orange-600 rounded transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 hover:bg-orange-600 rounded transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/Register')}
            className="px-4 py-2 hover:bg-orange-600 rounded transition-colors"
          >
            Register
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
