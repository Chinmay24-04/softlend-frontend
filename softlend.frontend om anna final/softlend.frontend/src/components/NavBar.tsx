import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUser, logout } from '../auth/auth'

export default function NavBar(){
  const user = getUser()
  const navigate = useNavigate()

  function doLogout(){
    logout()
    navigate('/login')
  }

  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 text-white px-3 py-1 rounded font-bold">Softlend</div>
        <nav className="text-sm text-gray-700">
          <Link to="/" className="mr-4">Dashboard</Link>
          <Link to="/offers" className="mr-4">Offers</Link>
          <Link to="/score" className="mr-4">Score</Link>
          <Link to="/emi">EMI</Link>
        </nav>
      </div>

      <div className="flex items-center gap-3 text-sm">
        {user ? (
          <>
            <div className="text-gray-700">{user.name}</div>
            <button onClick={doLogout} className="px-3 py-1 border rounded">Logout</button>
          </>
        ) : (
          <Link to="/login" className="px-3 py-1 border rounded">Sign in</Link>
        )}
      </div>
    </header>
  )
}
