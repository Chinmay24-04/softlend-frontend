import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../auth/auth'
import { CUSTOMER } from '../services/mockData'

const navItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Offers', to: '/offers' },
  { label: 'Simulator', to: '/score' },
  { label: 'EMI', to: '/emi' },
  { label: 'Profile', to: '/profile' },
]

const initials = CUSTOMER.name.split(' ').map(part => part[0]).join('').toUpperCase()

type HeaderProps = {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export default function Header({ theme, onToggleTheme }: HeaderProps){
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="dashboard-header">
      <div className="brand-shell">
        <div className="brand-mark">S</div>
        <div>
          <div className="brand-name">Softlend</div>
          <div className="brand-tag">Premium credit intelligence</div>
        </div>
      </div>

      <nav className="dashboard-nav">
        {navItems.map(item => (
          <NavLink key={item.to} to={item.to} className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="profile-shell">
        <button className="theme-toggle" type="button" onClick={onToggleTheme}>
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button className="logout-button" type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}
