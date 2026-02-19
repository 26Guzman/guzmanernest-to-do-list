import { useState, useEffect } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"

function Dashboard({ user, setUser }) {
  const navigate = useNavigate()
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
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#/">
            <i className="bi bi-graph-up"></i> Dashboard
          </a>
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

        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card shadow-sm border-0 text-center">
              <div className="card-body">
                <h6 className="text-muted">Total Lists</h6>
                <h3 className="fw-bold text-info">{stats.totalLists}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0 text-center">
              <div className="card-body">
                <h6 className="text-muted">Total Tasks</h6>
                <h3 className="fw-bold text-primary">{stats.totalTasks}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0 text-center">
              <div className="card-body">
                <h6 className="text-muted">Pending</h6>
                <h3 className="fw-bold text-warning">{stats.pending}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0 text-center">
              <div className="card-body">
                <h6 className="text-muted">Completed</h6>
                <h3 className="fw-bold text-success">{stats.completed}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Table */}
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white">
            <h5 className="mb-0">Your Task Lists</h5>
          </div>
          <div className="card-body">
            {tasks.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-muted">No tasks yet</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Task Name</th>
                      <th>Category</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task, index) => (
                      <tr key={task.id || index}>
                        <td>{index + 1}</td>
                        <td>{task.title}</td>
                        <td>{task.category || 'General'}</td>
                        <td>{task.dueDate || 'N/A'}</td>
                        <td>
                          <span className={`badge ${
                            task.status === 'pending' 
                              ? 'bg-warning text-dark'
                              : task.status === 'in progress'
                              ? 'bg-primary'
                              : 'bg-success'
                          }`}>
                            {task.status ? task.status.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Pending'}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => handleEdit(task)}
                            className="btn btn-sm btn-primary me-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(task.id)}
                            className="btn btn-sm btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Dashboard
