import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import LoanOffers from './pages/LoanOffers'
import ScoreSimulator from './pages/ScoreSimulator'
import EmiCalculator from './pages/EmiCalculator'
import Profile from './pages/Profile'
import Login from './pages/Login'
import SplashScreen from './pages/SplashScreen'
import ProtectedRoute from './components/ProtectedRoute'

export default function App(){
  const location = useLocation()
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return localStorage.getItem('softlend_theme') === 'light' ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', theme === 'light')
    document.documentElement.classList.toggle('dark-mode', theme === 'dark')
    localStorage.setItem('softlend_theme', theme)
  }, [theme])

  const hideHeader = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register'

  return (
    <div className="app-shell">
      {!hideHeader && <Header theme={theme} onToggleTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')} />}
      <main className="app-content">
        <Routes>
          <Route path="/" element={<SplashScreen/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Login/>} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/offers"
            element={
              <ProtectedRoute>
                <LoanOffers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/score"
            element={
              <ProtectedRoute>
                <ScoreSimulator />
              </ProtectedRoute>
            }
          />
          <Route
            path="/emi"
            element={
              <ProtectedRoute>
                <EmiCalculator />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Login/>} />
        </Routes>
      </main>
    </div>
  )
}
