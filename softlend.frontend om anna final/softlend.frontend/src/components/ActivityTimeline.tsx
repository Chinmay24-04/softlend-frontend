import React from 'react'

const events = [
  { date: 'Today', label: 'Score updated', detail: 'Your score improved by 15 points.' },
  { date: 'Yesterday', label: 'Offer unlocked', detail: 'Axis Bank personal loan became available.' },
  { date: '2 days ago', label: 'Payment cleared', detail: 'EMI payment posted successfully.' },
]

export default function ActivityTimeline(){
  return (
    <div className="timeline-card">
      <div className="panel-header">Recent credit activity</div>
      <div className="timeline-list">
        {events.map(event => (
          <div key={event.date} className="timeline-item">
            <div className="timeline-dot" />
            <div>
              <div className="timeline-date">{event.date}</div>
              <div className="timeline-label">{event.label}</div>
              <div className="timeline-detail">{event.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
