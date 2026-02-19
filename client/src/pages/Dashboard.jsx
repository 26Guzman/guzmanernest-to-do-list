import { useState, useEffect } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"

function Dashboard({ user, setUser }) {
  const navigate = useNavigate()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [tasks, setTasks] = useState([])
  const [stats, setStats] = useState({
    totalLists: 0,
    totalTasks: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      const response = await api.post("/logout")
      console.log(response.data)
      setSuccess(response.data?.message || "Logged out Successfully")
      setUser(null)
      setTimeout(() => navigate("/login"), 1000)
    } catch (error) {
      console.error("There was an error!", error.response?.data || error.message)
      setError(error.response?.data?.message || error.message || "An error occurred")
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return
    try {
      const response = await api.post("/delete-list", { id })
      console.log(response.data)
      setSuccess(response.data?.message || "Task Deleted successfully")
      fetchTasks()
      setError("")
    } catch (error) {
      console.error("There was an error!", error.response?.data || error.message)
      setError(error.response?.data?.message || error.message || "An error occurred")
    }
  }

  const handleEdit = (task) => {
    navigate("/list-item", { state: { listId: task.id, listTitle: task.title } })
  }

  const fetchTasks = async () => {
    try {
      const response = await api.get("/get-lists")
      console.log(response.data)
      const fetchedTasks = response.data.lists || []
      setTasks(fetchedTasks)

      // Fetch item stats
      try {
        const statsResponse = await api.get("/item-stats")
        console.log(statsResponse.data)
        if (statsResponse.data.success) {
          const itemStats = statsResponse.data.stats
          setStats({
            totalLists: fetchedTasks.length,
            totalTasks: parseInt(itemStats.total) || 0,
            pending: parseInt(itemStats.pending) || 0,
            inProgress: parseInt(itemStats.inProgress) || 0,
            completed: parseInt(itemStats.completed) || 0,
          })
        }
      } catch (statsError) {
        console.error("Error fetching item stats:", statsError)
        // Fallback to list-based stats if item-stats endpoint fails
        const pending = fetchedTasks.filter(t => t.status === 'pending').length
        const inProgress = fetchedTasks.filter(t => t.status === 'in progress').length
        const completed = fetchedTasks.filter(t => t.status === 'completed').length

        setStats({
          totalLists: fetchedTasks.length,
          totalTasks: fetchedTasks.length,
          pending,
          inProgress,
          completed,
        })
      }
    } catch (error) {
      console.error("There was an error!", error.response?.data || error.message)
      setError(error.response?.data?.message || error.message || "An error occurred")
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div className="bg-light min-vh-100 py-4">
      {/* Header */}
      <nav className="navbar navbar-expand-lg header-dark shadow-sm mb-4">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <button className="btn btn-link text-white d-md-none me-2" onClick={() => setMobileSidebarOpen(true)} aria-label="Open sidebar">
              <i className="bi bi-list" style={{fontSize:20}}></i>
            </button>
            <a className="navbar-brand fw-bold" href="#/">
              <i className="bi bi-graph-up"></i> Dashboard
            </a>
          </div>
          <div className="d-flex align-items-center">
            <div className="dropdown">
              <button className="btn btn-link dropdown-toggle text-dark text-decoration-none" type="button" data-bs-toggle="dropdown">
                Welcome, {user?.name || 'Admin'} <i className="bi bi-chevron-down"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button onClick={handleLogout} className="dropdown-item text-danger">
                    <i className="bi bi-box-arrow-right"></i> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="d-flex">
        <aside className="app-sidebar d-none d-md-block me-4">
          <div style={{marginBottom:24}}>
            <h2 style={{color:'#fff', margin:0, fontWeight:700}}>TaskFlow</h2>
          </div>
          <nav style={{display:'flex', flexDirection:'column', gap:12}}>
            <a href="#/dashboard" className="text-white text-decoration-none">📊 Dashboard</a>
            <a href="#/" className="text-white text-decoration-none">📝 Lists</a>
            <a href="#/list-item" className="text-white text-decoration-none">➕ New List</a>
            <a href="#/profile" className="text-white text-decoration-none">⚙️ Settings</a>
          </nav>
          <div style={{marginTop:24}}>
            <button onClick={handleLogout} className="btn btn-light">Logout</button>
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        {mobileSidebarOpen && (
          <div>
            <div className="sidebar-backdrop" onClick={() => setMobileSidebarOpen(false)}></div>
            <div className={`app-sidebar-mobile open`}>
              <div style={{marginBottom:24}}>
                <h2 style={{color:'#fff', margin:0, fontWeight:700}}>TaskFlow</h2>
              </div>
              <nav style={{display:'flex', flexDirection:'column', gap:12}}>
                <a href="#/dashboard" className="text-white text-decoration-none" onClick={() => setMobileSidebarOpen(false)}>📊 Dashboard</a>
                <a href="#/" className="text-white text-decoration-none" onClick={() => setMobileSidebarOpen(false)}>📝 Lists</a>
                <a href="#/list-item" className="text-white text-decoration-none" onClick={() => setMobileSidebarOpen(false)}>➕ New List</a>
                <a href="#/profile" className="text-white text-decoration-none" onClick={() => setMobileSidebarOpen(false)}>⚙️ Settings</a>
              </nav>
              <div style={{marginTop:24}}>
                <button onClick={() => { setMobileSidebarOpen(false); handleLogout() }} className="btn btn-light">Logout</button>
              </div>
            </div>
          </div>
        )}

        <main className="flex-grow-1">
          <div className="container">
        {error && (
          <div className="alert alert-danger alert-dismissible fade show mb-4" role="alert">
            <i className="bi bi-exclamation-circle-fill me-2"></i>
            {error}
            <button type="button" className="btn-close" onClick={() => setError("")}></button>
          </div>
        )}

        {success && (
          <div className="alert alert-success alert-dismissible fade show mb-4" role="alert">
            <i className="bi bi-check-circle-fill me-2"></i>
            {success}
            <button type="button" className="btn-close" onClick={() => setSuccess("")}></button>
          </div>
        )}

        {/* Summary Cards */}
        <div className="row mb-4">
          <div className="col-6 col-md-3">
            <div className="card p-3 text-center">
              <div className="card-body">
                <h6 className="text-muted">Total Lists</h6>
                <h3 className="fw-bold" style={{ color: 'var(--primary)' }}>{stats.totalLists}</h3>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="card p-3 text-center">
              <div className="card-body">
                <h6 className="text-muted">Total Tasks</h6>
                <h3 className="fw-bold" style={{ color: 'var(--primary)' }}>{stats.totalTasks}</h3>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3 mt-3 mt-md-0">
            <div className="card p-3 text-center">
              <div className="card-body">
                <h6 className="text-muted">Pending</h6>
                <h3 className="fw-bold" style={{ color: 'var(--priority-medium)' }}>{stats.pending}</h3>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3 mt-3 mt-md-0">
            <div className="card p-3 text-center">
              <div className="card-body">
                <h6 className="text-muted">Completed</h6>
                <h3 className="fw-bold" style={{ color: 'var(--priority-low)' }}>{stats.completed}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="mb-4">
          {tasks.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No tasks yet</p>
            </div>
          ) : (
            <div className="kanban">
              {[
                { key: 'pending', title: 'To Do' },
                { key: 'in progress', title: 'In Progress' },
                { key: 'completed', title: 'Completed' }
              ].map(col => {
                const colTasks = tasks.filter(t => (t.status || 'pending').toLowerCase() === col.key)
                return (
                  <div className="kanban-column" key={col.key}>
                    <div className="kanban-column-header">
                      <h6>{col.title}</h6>
                      <small className="text-muted">{colTasks.length}</small>
                    </div>
                    {colTasks.map((task, idx) => (
                      <div className="task-card" key={task.id || idx}>
                        <div className="task-title">{task.title}</div>
                        <div className="task-meta">
                          <div className="me-2">{task.category || 'General'}</div>
                          <div className="text-muted">{task.dueDate || 'No due'}</div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <div>
                            <span className={`status-dot ${col.key === 'pending' ? 'priority-medium' : col.key === 'in progress' ? 'priority-medium' : 'priority-low'}`}></span>
                          </div>
                          <div>
                            <button onClick={() => handleEdit(task)} className="btn btn-sm btn-primary me-2">Edit</button>
                            <button onClick={() => handleDelete(task.id)} className="btn btn-sm btn-danger">Delete</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          )}
          </div>
        </div>
        </main>
      </div>
    </div>
  )
}
export default Dashboard
