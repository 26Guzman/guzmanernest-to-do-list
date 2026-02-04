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
            <main className="flex-1 container mx-auto p-6 max-w-4xl">
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-semibold mb-6"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>

                    <div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">{title}</h1>
                        {passed?.id && <p className="text-sm text-gray-500">List ID: {passed.id}</p>}
                    </div>
                </div>

                {/* Tasks Section */}
                <div className="card p-8 mb-8">
                    {tasks.length === 0 ? (
                        <div className="text-center py-12">
                            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-gray-500">No tasks in this list.</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {tasks.map(task => (
                                <div
                                    key={task.id}
                                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                                >
                                    <input
                                        type="checkbox"
                                        checked={task.status === 'completed'}
                                        onChange={() => toggleStatus(task.id)}
                                        className="w-5 h-5 mt-1 cursor-pointer accent-orange-500"
                                    />
                                    <div className="flex-1">
                                        <div className={`font-medium text-lg ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                                            {task.text}
                                        </div>
                                        {task.description && (
                                            <div className="text-sm text-gray-500 mt-1">{task.description}</div>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => removeTask(task.id)}
                                        className="px-3 py-1 text-sm text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all"
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
                    <div className="card p-8">
                        <h2 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Removed Tasks
                        </h2>
                        <div className="space-y-2">
                            {removed.map(r => (
                                <div key={r.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="text-sm text-gray-600">{r.text}</div>
                                    <button
                                        onClick={() => restoreTask(r.id)}
                                        className="text-sm text-blue-600 hover:text-blue-800 font-semibold"
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
