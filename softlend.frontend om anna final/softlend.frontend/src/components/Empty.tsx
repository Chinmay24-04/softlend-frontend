import React from 'react'

export default function Empty({text}:{text?:string}){
  return (
    <div className="card empty-card">
      <p className="muted">{text || 'No results found.'}</p>
    </div>
  )
}
