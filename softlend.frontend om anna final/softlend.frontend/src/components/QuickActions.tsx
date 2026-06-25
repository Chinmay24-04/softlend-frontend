import React from 'react'

const actions = [
  { title: 'Boost score', subtitle: 'Pay down outstanding balances', color: '#0284c7' },
  { title: 'Unlock offers', subtitle: 'Refresh eligible loan list', color: '#10b981' },
  { title: 'Review credit', subtitle: 'Check recent bureau updates', color: '#8b5cf6' },
]

export default function QuickActions(){
  return (
    <div className="quick-panel">
      <div className="panel-header">Quick actions</div>
      <div className="panel-grid">
        {actions.map(action => (
          <button key={action.title} className="action-card" style={{borderColor: action.color}}>
            <div className="action-icon" style={{background: `${action.color}22`, color: action.color}}>{action.title[0]}</div>
            <div>
              <div className="action-title">{action.title}</div>
              <div className="action-sub">{action.subtitle}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
