import Header from './components/Header.jsx'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function ListItem() {
    const location = useLocation()
    const navigate = useNavigate()

    // If Home passed items via route state use them, otherwise fallback to defaults
    const passed = location.state
    const title = passed?.title || 'List Items'
    const initialItems = (passed?.items || []).map((it, i) => ({
        id: it.id ?? i + 1,
        text: it.text ?? it.title,
        description: it.description ?? '',
        status: String(it.status || 'pending').toLowerCase()
    }))

    const [tasks, setTasks] = useState(initialItems)
    const [removed, setRemoved] = useState([])

    const toggleStatus = (id) => {
        setTasks((prev) => prev.map(t => t.id === id ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t))
    }

    const removeTask = (id) => {
        setTasks((prev) => {
            const found = prev.find(p => p.id === id)
            if (!found) return prev
            setRemoved(r => [found, ...r])
            return prev.filter(p => p.id !== id)
        })
    }

    const restoreTask = (id) => {
        setRemoved((prev) => {
            const found = prev.find(p => p.id === id)
            if (!found) return prev
            setTasks(t => [found, ...t])
            return prev.filter(p => p.id !== id)
        })
    }

    return (
        <>
            <Header />
            <main className="flex-1 container mx-auto p-4 max-w-4xl">
                <div className="mb-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-semibold mb-3 text-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-1">{title}</h1>
                        {passed?.id && <p className="text-xs text-gray-500">List ID: {passed.id}</p>}
                    </div>
                </div>

                {/* Tasks Section */}
                <div className="card p-4 mb-4">
                    {tasks.length === 0 ? (
                        <div className="text-center py-6">
                            <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-gray-500 text-sm">No tasks in this list.</p>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {tasks.map(task => (
                                <div
                                    key={task.id}
                                    className="flex items-start gap-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                                >
                                    <input
                                        type="checkbox"
                                        checked={task.status === 'completed'}
                                        onChange={() => toggleStatus(task.id)}
                                        className="w-4 h-4 mt-0.5 cursor-pointer accent-orange-500"
                                    />
                                    <div className="flex-1">
                                        <div className={`font-medium text-sm ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                                            {task.text}
                                        </div>
                                        {task.description && (
                                            <div className="text-xs text-gray-500 mt-0.5">{task.description}</div>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => removeTask(task.id)}
                                        className="px-2 py-0.5 text-xs text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Removed Tasks Section */}
                {removed.length > 0 && (
                    <div className="card p-4">
                        <h2 className="font-bold text-sm text-gray-800 mb-2 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Removed Tasks
                        </h2>
                        <div className="space-y-1">
                            {removed.map(r => (
                                <div key={r.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                    <div className="text-xs text-gray-600">{r.text}</div>
                                    <button
                                        onClick={() => restoreTask(r.id)}
                                        className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                                    >
                                        Restore
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </>
    )
}

export default ListItem
