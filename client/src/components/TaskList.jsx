import React from 'react'

function TaskList({ tasks = [] }) {
  return (
    <div className="bg-white bg-opacity-8 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">Recent Tasks</h2>
      <ul className="space-y-2">
        {tasks.length === 0 && <li className="text-sm opacity-70">No recent tasks</li>}
        {tasks.map((t) => (
          <li key={t.id} className="flex items-start justify-between bg-white bg-opacity-5 p-3 rounded">
            <div>
              <p className="font-medium">{t.title}</p>
              <p className="text-xs opacity-70">{t.description}</p>
            </div>
            <div className="text-sm opacity-80">{t.due || '—'}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskList
