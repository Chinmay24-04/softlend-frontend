import React from 'react'

export default function ErrorMessage({message}:{message?:string}){
  return (
    <div className="card error-card">
      <p style={{color:'#991b1b',margin:0}}>Error: {message || 'Something went wrong'}</p>
    </div>
  )
}
