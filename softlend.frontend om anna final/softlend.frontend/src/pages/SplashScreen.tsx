import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function SplashScreen(){
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress(prev => Math.min(prev + Math.random() * 16 + 8, 94))
    }, 180)

    const timeout = window.setTimeout(() => {
      setProgress(100)
      window.setTimeout(() => navigate('/login'), 500)
    }, 2600)

    return () => {
      window.clearInterval(interval)
      window.clearTimeout(timeout)
    }
  }, [navigate])

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: 'radial-gradient(circle at top left, rgba(124, 58, 237, 0.18), transparent 25%), radial-gradient(circle at top right, rgba(59, 130, 246, 0.16), transparent 22%), radial-gradient(circle at 20% 70%, rgba(20, 184, 166, 0.18), transparent 20%), linear-gradient(180deg, #0b1224 0%, #070b17 100%)',
      fontFamily: "'Inter', sans-serif",
      color: '#f8fafc'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none'
      }}>
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            background: 'rgba(124, 58, 237, 0.16)',
            filter: 'blur(64px)',
            top: '10%',
            left: '-10%'
          }}
        />
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, 25, 0] }}
          transition={{ duration: 16, repeat: Infinity, delay: 1, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'rgba(59, 130, 246, 0.14)',
            filter: 'blur(64px)',
            top: '5%',
            right: '-8%'
          }}
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, -10, 0] }}
          transition={{ duration: 18, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            background: 'rgba(20, 184, 166, 0.12)',
            filter: 'blur(60px)',
            bottom: '10%',
            left: '10%'
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '560px',
          textAlign: 'center'
        }}
      >
        <div style={{
          position: 'relative',
          margin: '0 auto 24px',
          width: '128px',
          height: '128px',
          borderRadius: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '32px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.14)',
          backdropFilter: 'blur(26px)',
          boxShadow: '0 28px 80px rgba(13, 44, 81, 0.32)'
        }}>
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '28px',
              background: 'radial-gradient(circle at center, rgba(255,255,255,0.18), transparent 55%)'
            }}
          />
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '28px',
              border: '1px solid rgba(124, 58, 237, 0.28)',
              boxShadow: '0 0 0 1px rgba(59, 130, 246, 0.08)'
            }}
          />
          <div style={{
            position: 'relative',
            zIndex: 2,
            width: '80px',
            height: '80px',
            borderRadius: '22px',
            display: 'grid',
            placeItems: 'center',
            background: 'linear-gradient(135deg, #7c3aed, #3b82f6, #14b8a6)',
            color: '#fff',
            fontSize: '2rem',
            fontWeight: 900,
            boxShadow: '0 18px 42px rgba(59, 130, 246, 0.28)'
          }}>
            S
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <h1 style={{
            margin: 0,
            fontSize: '3rem',
            lineHeight: 1.04,
            letterSpacing: '-0.06em',
            fontWeight: 900,
            color: '#ffffff'
          }}>
            SOFTLEND
          </h1>
          <p style={{
            margin: '16px 0 0',
            fontSize: '1rem',
            color: 'rgba(241, 245, 249, 0.82)',
            fontWeight: 500,
            letterSpacing: '0.04em'
          }}>
            Smart Credit. Better Future.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          style={{
            marginTop: '38px',
            padding: '20px 24px',
            borderRadius: '28px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.14)',
            backdropFilter: 'blur(28px)',
            boxShadow: '0 28px 90px rgba(15, 23, 42, 0.22)'
          }}
        >
          <div style={{
            display: 'grid',
            gap: '18px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <span style={{ color: '#e2e8f0', fontWeight: 600 }}>Initializing credit insights</span>
              <span style={{ color: '#60a5fa', fontWeight: 700 }}>...</span>
            </div>
            <div style={{
              width: '100%',
              height: '8px',
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.12)',
              overflow: 'hidden'
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  borderRadius: '999px',
                  background: 'linear-gradient(90deg, #7c3aed, #3b82f6, #14b8a6)'
                }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
