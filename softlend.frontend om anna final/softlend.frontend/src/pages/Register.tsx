import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent){
    e.preventDefault()
    navigate('/login')
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-2">Create your Softlend account</h2>
        <p className="text-sm text-gray-500 mb-4">Register now to save offers, track your score, and personalize your dashboard.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full name</label>
            <input value={name} onChange={e=>setName(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-sky-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-sky-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-sky-500" />
          </div>
          <button type="submit" className="btn btn-primary w-full">Create account</button>
          <div className="text-sm text-gray-500">Already have an account? <button type="button" className="text-sky-600 hover:underline" onClick={() => navigate('/login')}>Sign in</button></div>
        </form>
      </div>
    </div>
  )
}
