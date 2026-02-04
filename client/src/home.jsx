import Header from './components/Header.jsx'
import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:5000/api'

function Home({ user }) {
  const [activeList, setActiveList] = useState(null)
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [tasks, setTasks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch lists from backend on mount
  useEffect(() => {
    fetchLists()
  }, [])

  const fetchLists = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/lists`, {
        credentials: 'include'
      })
      const data = await response.json()
      if (data.success) {
        setLists(data.lists)
      } else {
        setError('Failed to load lists')
      }
    } catch (err) {
      setError('Error connecting to server')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchTasks = async (listId) => {
    try {
      const response = await fetch(`${API_URL}/lists/${listId}/items`, {
        credentials: 'include'
      })
      const data = await response.json()
      if (data.success) {
        setTasks(data.items || [])
      }
    } catch (err) {
      console.error('Error fetching tasks:', err)
    }
  }

  const addList = async (title, description = '') => {
    try {
      const response = await fetch(`${API_URL}/lists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title, description, status: 'pending' })
      })
      const data = await response.json()
      if (data.success) {
        setLists([data.list, ...lists])
        setShowForm(false)
      }
    } catch (err) {
      console.error('Error adding list:', err)
    }
  }

  const deleteList = async (listId) => {
    if (!window.confirm('Are you sure you want to delete this list?')) return
    try {
      const response = await fetch(`${API_URL}/lists/${listId}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      const data = await response.json()
      if (data.success) {
        setLists(lists.filter(l => l.id !== listId))
        setActiveList(null)
      }
    } catch (err) {
      console.error('Error deleting list:', err)
    }
  }

  const updateList = async (listId, title, description) => {
    try {
      const response = await fetch(`${API_URL}/lists/${listId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title, description })
      })
      const data = await response.json()
      if (data.success) {
        setLists(lists.map(l => l.id === listId ? { ...l, title, description } : l))
        setIsEditing(false)
      }
    } catch (err) {
      console.error('Error updating list:', err)
    }
  }

  const toggleListStatus = async (listId, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending'
    try {
      const list = lists.find(l => l.id === listId)
      const response = await fetch(`${API_URL}/lists/${listId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title: list.title, description: list.description, status: newStatus })
      })
      const data = await response.json()
      if (data.success) {
        setLists(lists.map(l => l.id === listId ? { ...l, status: newStatus } : l))
      }
    } catch (err) {
      console.error('Error toggling list status:', err)
    }
  }

  const addTask = async (listId, taskDescription) => {
    try {
      const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ list_id: listId, description: taskDescription, status: 'pending' })
      })
      const data = await response.json()
      if (data.success) {
        setTasks([...tasks, data.item])
      }
    } catch (err) {
      console.error('Error adding task:', err)
    }
  }

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/items/${taskId}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      const data = await response.json()
      if (data.success) {
        setTasks(tasks.filter(t => t.id !== taskId))
      }
    } catch (err) {
      console.error('Error deleting task:', err)
    }
  }

  const toggleTaskStatus = async (taskId, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending'
    try {
      const response = await fetch(`${API_URL}/items/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus })
      })
      const data = await response.json()
      if (data.success) {
        setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t))
      }
    } catch (err) {
      console.error('Error toggling task status:', err)
    }
  }

  const filteredLists = lists.filter(list =>
    list.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const activeLisObj = lists.find(l => l.id === activeList)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="flex-1 container mx-auto p-6 max-w-6xl">
        {/* Header Section */}
        {!activeList && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
                <p className="text-gray-600">Welcome back, <span className="font-semibold text-orange-500">{user?.name}</span>!</p>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="btn-primary flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New List
              </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search lists..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 form-input bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
            <p className="text-gray-600 mt-4">Loading your lists...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {/* List View */}
        {!loading && !activeList && (
          <div>
            {/* Create List Form */}
            {showForm && (
              <div className="card p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New List</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const title = e.target.elements.listTitle.value
                    const description = e.target.elements.listDescription.value
                    if (title.trim()) {
                      addList(title, description)
                      e.target.reset()
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">List Title</label>
                    <input
                      type="text"
                      name="listTitle"
                      placeholder="e.g., Shopping, Work Projects..."
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Description</label>
                    <textarea
                      name="listDescription"
                      placeholder="Add a description (optional)..."
                      className="form-textarea"
                      rows="3"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" className="btn-primary">
                      Create List
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Lists Grid */}
            {filteredLists.length === 0 ? (
              <div className="text-center py-16">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-gray-500 text-lg mb-4">No lists yet</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="btn-primary"
                >
                  Create your first list
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLists.map((list) => (
                  <div
                    key={list.id}
                    onClick={() => {
                      setActiveList(list.id)
                      fetchTasks(list.id)
                    }}
                    className="card p-6 cursor-pointer hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={list.status === 'completed'}
                        onChange={(e) => {
                          e.stopPropagation()
                          toggleListStatus(list.id, list.status)
                        }}
                        className="w-5 h-5 mt-1 cursor-pointer accent-orange-500"
                      />
                      <div className="flex-1">
                        <h3 className={`text-xl font-bold mb-2 ${
                          list.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-800'
                        }`}>
                          {list.title}
                        </h3>
                        <p className={`text-sm mb-4 ${list.status === 'completed' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {list.description || 'No description'}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            list.status === 'completed'
                              ? 'badge badge-success'
                              : 'badge badge-pending'
                          }`}>
                            {list.status === 'completed' ? 'Completed' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* List Detail View */}
        {!loading && activeList && activeLisObj && (
          <div>
            {/* Back Button */}
            <button
              onClick={() => setActiveList(null)}
              className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-800 font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Lists
            </button>

            {/* List Header */}
            <div className="card p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4 flex-1">
                  <input
                    type="checkbox"
                    checked={activeLisObj.status === 'completed'}
                    onChange={() => toggleListStatus(activeList, activeLisObj.status)}
                    className="w-6 h-6 mt-2 cursor-pointer accent-orange-500"
                  />
                  <div className="flex-1">
                    <h2 className={`text-4xl font-bold mb-3 ${
                      activeLisObj.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-800'
                    }`}>
                      {activeLisObj.title}
                    </h2>
                    <p className={`text-lg ${
                      activeLisObj.status === 'completed' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {activeLisObj.description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                  <button
                    onClick={() => deleteList(activeList)}
                    className="btn-danger flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>

              {/* Edit Form */}
              {isEditing && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const title = e.target.elements.editTitle.value
                    const description = e.target.elements.editDescription.value
                    if (title.trim()) {
                      updateList(activeList, title, description)
                    }
                  }}
                  className="bg-gray-50 p-6 rounded-lg space-y-4 mt-6"
                >
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Title</label>
                    <input
                      type="text"
                      name="editTitle"
                      defaultValue={activeLisObj.title}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Description</label>
                    <textarea
                      name="editDescription"
                      defaultValue={activeLisObj.description}
                      className="form-textarea"
                      rows="3"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" className="btn-primary">Save Changes</button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Tasks Section */}
            {!isEditing && (
              <div className="card p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Tasks</h3>

                {/* Add Task Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const taskDescription = e.target.elements.taskInput.value
                    if (taskDescription.trim()) {
                      addTask(activeList, taskDescription)
                      e.target.reset()
                    }
                  }}
                  className="flex gap-3 mb-8"
                >
                  <input
                    type="text"
                    name="taskInput"
                    placeholder="Add a new task..."
                    className="form-input flex-1"
                  />
                  <button
                    type="submit"
                    className="btn-primary flex items-center gap-2 whitespace-nowrap"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add
                  </button>
                </form>

                {/* Tasks List */}
                <div className="space-y-2">
                  {tasks.filter(t => t.list_id === activeList).length === 0 ? (
                    <div className="text-center py-12">
                      <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-500">No tasks yet. Add one to get started!</p>
                    </div>
                  ) : (
                    tasks.filter(t => t.list_id === activeList).map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                      >
                        <input
                          type="checkbox"
                          checked={task.status === 'completed'}
                          onChange={() => toggleTaskStatus(task.id, task.status)}
                          className="w-5 h-5 cursor-pointer accent-orange-500"
                        />
                        <span className={`flex-1 text-lg ${
                          task.status === 'completed'
                            ? 'line-through text-gray-400'
                            : 'text-gray-800'
                        }`}>
                          {task.description}
                        </span>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default Home
