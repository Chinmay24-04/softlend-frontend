import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { isAuthenticated, login, register } from '../auth/auth'
import './Login.css'

type LoginFields = {
  name: string
  email: string
  password: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const mobilePattern = /^\d{10}$/
const defaultCredentials = {
  email: 'demo@softlend.com',
  password: 'Softlend123!'
}

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const isRegisterMode = location.pathname === '/register'
  const [fields, setFields] = useState<LoginFields>({ name: '', email: defaultCredentials.email, password: defaultCredentials.password })
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({})
  const [submitError, setSubmitError] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard', { replace: true })
    }
  }, [navigate])

  useEffect(() => {
    if (!toast) return
    const timeout = window.setTimeout(() => setToast(null), 3200)
    return () => window.clearTimeout(timeout)
  }, [toast])

  const validation = useMemo(() => {
    const result: { email?: string; password?: string } = {}
    if (isRegisterMode && !fields.name.trim()) {
      result.name = 'Full name is required'
    }
    if (!fields.email.trim()) {
      result.email = 'Email or mobile number is required'
    } else if (!emailPattern.test(fields.email) && !mobilePattern.test(fields.email)) {
      result.email = 'Enter a valid email or 10-digit mobile number'
    }
    if (!fields.password.trim()) {
      result.password = 'Password is required'
    }
    return result
  }, [fields])

  function handleChange(field: keyof LoginFields, value: string) {
    setFields(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
    setSubmitError('')
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitError('')
    setErrors(validation)

    if (Object.keys(validation).length > 0) {
      setToast({ type: 'error', message: 'Please correct the highlighted fields' })
      return
    }

    setLoading(true)
    try {
      const response = isRegisterMode
        ? register(fields.email, fields.password, fields.name.trim())
        : login(fields.email, fields.password)

      if (response.ok) {
        setToast({ type: 'success', message: isRegisterMode ? `Welcome aboard, ${response.user.name}` : `Welcome back, ${response.user.name}` })
        navigate('/dashboard', { replace: true })
      } else {
        setSubmitError(response.error)
        setToast({ type: 'error', message: response.error })
      }
    } catch (error) {
      const message = String(error || (isRegisterMode ? 'Unable to register' : 'Unable to sign in'))
      setSubmitError(message)
      setToast({ type: 'error', message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-shell">
      <div className="login-background">
        <span className="bg-shape shape-1" />
        <span className="bg-shape shape-2" />
        <span className="bg-shape shape-3" />
        <span className="bg-shape shape-4" />
        <span className="bg-shape shape-5" />
      </div>

      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="login-panel">
          <div className="login-header">
            <div>
              <p className="eyebrow">Softlend Credit Improvement</p>
              <h1>Premium credit access, tailored for you</h1>
            </div>
          </div>

          <p className="login-copy">
            {isRegisterMode
              ? 'Create your premium Softlend account and start managing credit smarter.'
              : 'Sign in securely to access your Softlend dashboard and personalized credit insights.'}
          </p>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {isRegisterMode && (
              <label className="form-label">
                Full Name
                <input
                  type="text"
                  className="form-input"
                  value={fields.name}
                  onChange={e => handleChange('name', e.target.value)}
                  placeholder="Ravi Patel"
                  autoComplete="name"
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </label>
            )}

            <label className="form-label">
              Email or Mobile Number
              <input
                type="text"
                className="form-input"
                value={fields.email}
                onChange={e => handleChange('email', e.target.value)}
                placeholder="ravi@softlend.com"
                autoComplete="username"
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </label>

            <label className="form-label">
              Password
              <input
                type="password"
                className="form-input"
                value={fields.password}
                onChange={e => handleChange('password', e.target.value)}
                placeholder="password123"
                autoComplete="current-password"
              />
              {errors.password && <span className="field-error">{errors.password}</span>}
            </label>

            {submitError && <div className="submit-error">{submitError}</div>}

            <div className="button-row">
              <motion.button
                type="submit"
                className="enter-button"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading && <span className="button-spinner" />}
                {loading ? (isRegisterMode ? 'Creating Account...' : 'Signing In...') : (isRegisterMode ? 'Create Account' : 'Enter Dashboard')}
              </motion.button>

              <button
                type="button"
                className="secondary-button"
                onClick={() => navigate(isRegisterMode ? '/login' : '/register')}
              >
                {isRegisterMode ? 'Back to Login' : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      {toast && <div className={`login-toast ${toast.type}`}>{toast.message}</div>}
    </div>
  )
}
