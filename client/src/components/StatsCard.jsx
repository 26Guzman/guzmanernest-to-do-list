import React from 'react'

function StatsCard({ title, value, icon }) {
  return (
    <div className="bg-white bg-opacity-10 rounded-lg p-3 flex items-center gap-3 shadow-sm">
      <div className="w-10 h-10 bg-white bg-opacity-20 rounded flex items-center justify-center">
        {icon || <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18h18" /></svg>}
      </div>
      <div>
        <p className="text-xs opacity-75">{title}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  )
}

export default StatsCard
