import React from 'react'
import { CUSTOMER, SCORE_FACTORS, OFFERS } from '../services/mockData'
import CreditGauge from '../components/CreditGauge'

const achievements = [
  'Score improved by 50 points',
  'On-time payment streak',
  'Pre-approved customer',
]

const securityItems = [
  { title: 'Password', description: 'Last changed 34 days ago', status: 'active' },
  { title: 'Two-factor authentication', description: 'Enabled via SMS', status: 'active' },
  { title: 'Security alerts', description: 'Email notifications enabled', status: 'active' },
]

export default function Profile(){
  const tier = CUSTOMER.cibil_score >= 750 ? 'Excellent' : CUSTOMER.cibil_score >= 700 ? 'Good' : 'Fair'
  const eligibility = CUSTOMER.cibil_score >= 650 ? 'Eligible for premium loans' : 'Needs improvement to unlock offers'
  const health = SCORE_FACTORS.map(item => ({ title: item.factor, value: item.current_value, status: item.impact }))

  return (
    <div style={{maxWidth:'1200px',margin:'0 auto',padding:'24px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:32}}>
        <div>
          <h1 style={{fontSize:'2.2rem',fontWeight:900,color:'#fff',margin:0,marginBottom:8}}>Profile</h1>
          <p style={{color:'#cbd5e1',margin:0,fontSize:'.95rem'}}>{tier} member • Score: {CUSTOMER.cibil_score}</p>
        </div>
        <button className="btn btn-accent" style={{padding:'12px 24px'}}>Edit Profile</button>
      </div>

      {/* Personal Information Section */}
      <div className="glass-card" style={{marginBottom:24}}>
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:24}}>
          <div style={{width:44,height:44,borderRadius:'12px',background:'linear-gradient(135deg,#3b82f6,#1e40af)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.4rem'}}>👤</div>
          <div className="panel-header" style={{margin:0}}>Personal information</div>
          <button style={{marginLeft:'auto',background:'none',border:'none',color:'#60a5fa',cursor:'pointer',fontSize:'1.2rem'}}>✎</button>
        </div>

        <div style={{display:'grid',gap:0}}>
          <div style={{display:'grid',gridTemplateColumns:'auto 1fr auto',alignItems:'center',gap:16,padding:'16px 0',borderBottom:'1px solid rgba(255,255,255,.08)',fontSize:'.95rem'}}>
            <div style={{width:36,height:36,borderRadius:'8px',background:'rgba(59,130,246,.16)',display:'flex',alignItems:'center',justifyContent:'center',color:'#60a5fa'}}>👤</div>
            <div><div style={{color:'#94a3b8',fontSize:'.85rem'}}>Name</div><div style={{color:'#fff',fontWeight:600,marginTop:4}}>{CUSTOMER.name}</div></div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'auto 1fr auto',alignItems:'center',gap:16,padding:'16px 0',borderBottom:'1px solid rgba(255,255,255,.08)',fontSize:'.95rem'}}>
            <div style={{width:36,height:36,borderRadius:'8px',background:'rgba(34,197,94,.16)',display:'flex',alignItems:'center',justifyContent:'center',color:'#22c55e'}}>✉️</div>
            <div><div style={{color:'#94a3b8',fontSize:'.85rem'}}>Email</div><div style={{color:'#60a5fa',fontWeight:600,marginTop:4}}>{CUSTOMER.email}</div></div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'auto 1fr auto',alignItems:'center',gap:16,padding:'16px 0',borderBottom:'1px solid rgba(255,255,255,.08)',fontSize:'.95rem'}}>
            <div style={{width:36,height:36,borderRadius:'8px',background:'rgba(16,185,129,.16)',display:'flex',alignItems:'center',justifyContent:'center',color:'#10b981'}}>📱</div>
            <div><div style={{color:'#94a3b8',fontSize:'.85rem'}}>Phone</div><div style={{color:'#fff',fontWeight:600,marginTop:4}}>{CUSTOMER.phone}</div></div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'auto 1fr auto',alignItems:'center',gap:16,padding:'16px 0',borderBottom:'1px solid rgba(255,255,255,.08)',fontSize:'.95rem'}}>
            <div style={{width:36,height:36,borderRadius:'8px',background:'rgba(168,85,247,.16)',display:'flex',alignItems:'center',justifyContent:'center',color:'#a855f7'}}>💼</div>
            <div><div style={{color:'#94a3b8',fontSize:'.85rem'}}>Employment</div><div style={{color:'#fff',fontWeight:600,marginTop:4}}>{CUSTOMER.employment}</div></div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'auto 1fr auto',alignItems:'center',gap:16,padding:'16px 0',borderBottom:'1px solid rgba(255,255,255,.08)',fontSize:'.95rem'}}>
            <div style={{width:36,height:36,borderRadius:'8px',background:'rgba(249,115,22,.16)',display:'flex',alignItems:'center',justifyContent:'center',color:'#f97316'}}>💰</div>
            <div><div style={{color:'#94a3b8',fontSize:'.85rem'}}>Income</div><div style={{color:'#fff',fontWeight:600,marginTop:4}}>{CUSTOMER.income_range}</div></div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'auto 1fr auto',alignItems:'center',gap:16,padding:'16px 0',fontSize:'.95rem'}}>
            <div style={{width:36,height:36,borderRadius:'8px',background:'rgba(244,63,94,.16)',display:'flex',alignItems:'center',justifyContent:'center',color:'#f43f5e'}}>📍</div>
            <div><div style={{color:'#94a3b8',fontSize:'.85rem'}}>Address</div><div style={{color:'#fff',fontWeight:600,marginTop:4}}>{CUSTOMER.address}</div></div>
          </div>
        </div>
      </div>

      {/* KYC & Verification Section */}
      <div className="glass-card" style={{marginBottom:24}}>
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:24}}>
          <div style={{width:44,height:44,borderRadius:'12px',background:'linear-gradient(135deg,#10b981,#059669)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.4rem'}}>✔️</div>
          <div className="panel-header" style={{margin:0}}>KYC & verification</div>
        </div>

        <div style={{display:'grid',gap:0}}>
          <div style={{display:'grid',gridTemplateColumns:'auto 1fr auto',alignItems:'center',gap:16,padding:'18px 0',borderBottom:'1px solid rgba(255,255,255,.08)'}}>
            <div style={{width:40,height:40,borderRadius:'8px',background:'rgba(16,185,129,.12)',display:'flex',alignItems:'center',justifyContent:'center',color:'#10b981',fontSize:'1.1rem'}}>🆔</div>
            <div><div style={{color:'#cbd5e1',fontWeight:600}}>ID verified</div><div style={{color:'#94a3b8',fontSize:'.85rem',marginTop:2}}>Aadhaar verification</div></div>
            <div style={{padding:'6px 12px',borderRadius:'8px',background:'rgba(34,197,94,.16)',color:'#22c55e',fontSize:'.8rem',fontWeight:700}}>✓ Complete</div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'auto 1fr auto',alignItems:'center',gap:16,padding:'18px 0',borderBottom:'1px solid rgba(255,255,255,.08)'}}>
            <div style={{width:40,height:40,borderRadius:'8px',background:'rgba(34,197,94,.12)',display:'flex',alignItems:'center',justifyContent:'center',color:'#22c55e',fontSize:'1.1rem'}}>🏛️</div>
            <div><div style={{color:'#cbd5e1',fontWeight:600}}>PAN verified</div><div style={{color:'#94a3b8',fontSize:'.85rem',marginTop:2}}>Tax ID verification</div></div>
            <div style={{padding:'6px 12px',borderRadius:'8px',background:'rgba(34,197,94,.16)',color:'#22c55e',fontSize:'.8rem',fontWeight:700}}>✓ Complete</div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'auto 1fr auto',alignItems:'center',gap:16,padding:'18px 0',borderBottom:'1px solid rgba(255,255,255,.08)'}}>
            <div style={{width:40,height:40,borderRadius:'8px',background:'rgba(249,115,22,.12)',display:'flex',alignItems:'center',justifyContent:'center',color:'#f97316',fontSize:'1.1rem'}}>📄</div>
            <div><div style={{color:'#cbd5e1',fontWeight:600}}>Address proof</div><div style={{color:'#94a3b8',fontSize:'.85rem',marginTop:2}}>Utility bill or lease</div></div>
            <div style={{padding:'6px 12px',borderRadius:'8px',background:'rgba(249,115,22,.16)',color:'#fbbf24',fontSize:'.8rem',fontWeight:700}}>⏱ Pending</div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'auto 1fr auto',alignItems:'center',gap:16,padding:'18px 0'}}>
            <div style={{width:40,height:40,borderRadius:'8px',background:'rgba(34,197,94,.12)',display:'flex',alignItems:'center',justifyContent:'center',color:'#22c55e',fontSize:'1.1rem'}}>👤</div>
            <div><div style={{color:'#cbd5e1',fontWeight:600}}>Phone verified</div><div style={{color:'#94a3b8',fontSize:'.85rem',marginTop:2}}>OTP verification</div></div>
            <div style={{padding:'6px 12px',borderRadius:'8px',background:'rgba(34,197,94,.16)',color:'#22c55e',fontSize:'.8rem',fontWeight:700}}>✓ Complete</div>
          </div>
        </div>
      </div>

      {/* Credit Score Section */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,marginBottom:24}}>
        <div className="glass-card">
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
            <div style={{width:44,height:44,borderRadius:'12px',background:'linear-gradient(135deg,#3b82f6,#1e40af)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.4rem'}}>📊</div>
            <div className="panel-header" style={{margin:0}}>Credit insights</div>
          </div>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:'3.2rem',fontWeight:900,color:'#38bdf8',marginBottom:8}}>{CUSTOMER.cibil_score}</div>
            <div style={{color:'#94a3b8',fontSize:'.95rem',marginBottom:16}}>Current CIBIL score</div>
            <div style={{display:'inline-block',padding:'8px 16px',borderRadius:'8px',background:'rgba(16,185,129,.16)',color:'#22c55e',fontWeight:700,fontSize:'.9rem'}}>{eligibility}</div>
          </div>
        </div>

        <div className="glass-card">
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
            <div style={{width:44,height:44,borderRadius:'12px',background:'linear-gradient(135deg,#f97316,#c2410c)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.4rem'}}>🏆</div>
            <div className="panel-header" style={{margin:0}}>Achievements</div>
          </div>
          <div style={{display:'grid',gap:12}}>
            {achievements.map(item => <div key={item} style={{padding:'12px 14px',borderRadius:'10px',background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.1)',color:'#cbd5e1',fontWeight:600,fontSize:'.9rem'}}>✨ {item}</div>)}
          </div>
        </div>
      </div>

      {/* Financial Health & Offers */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,marginBottom:24}}>
        <div className="glass-card">
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
            <div style={{width:44,height:44,borderRadius:'12px',background:'linear-gradient(135deg,#06b6d4,#0891b2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.4rem'}}>💹</div>
            <div className="panel-header" style={{margin:0}}>Financial health</div>
          </div>
          <div style={{display:'grid',gap:12}}>
            {health.map(item => (
              <div key={item.title} style={{padding:'12px 14px',borderRadius:'10px',background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.1)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div><div style={{color:'#cbd5e1',fontWeight:600,fontSize:'.9rem'}}>{item.title}</div></div>
                <div style={{color:'#60a5fa',fontWeight:700}}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card">
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
            <div style={{width:44,height:44,borderRadius:'12px',background:'linear-gradient(135deg,#8b5cf6,#7c3aed)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.4rem'}}>🎁</div>
            <div className="panel-header" style={{margin:0}}>Available offers</div>
          </div>
          <div style={{display:'grid',gap:12}}>
            {OFFERS.slice(0,3).map(offer => (
              <div key={offer.id} style={{padding:'14px',borderRadius:'10px',background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.1)'}}>
                <div style={{color:'#cbd5e1',fontWeight:700,fontSize:'.9rem',marginBottom:4}}>{offer.lender}</div>
                <div style={{color:'#38bdf8',fontWeight:800}}>{(offer.amount/100000).toFixed(1)}L @ {offer.interest_rate}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security & Payment History */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
        <div className="glass-card">
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
            <div style={{width:44,height:44,borderRadius:'12px',background:'linear-gradient(135deg,#ec4899,#be185d)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.4rem'}}>🔒</div>
            <div className="panel-header" style={{margin:0}}>Security</div>
          </div>
          <div style={{display:'grid',gap:12}}>
            {securityItems.map(item => (
              <div key={item.title} style={{padding:'12px 14px',borderRadius:'10px',background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.1)'}}>
                <div style={{color:'#cbd5e1',fontWeight:700,fontSize:'.9rem',marginBottom:4}}>{item.title}</div>
                <div style={{color:'#94a3b8',fontSize:'.85rem'}}>{item.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card">
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
            <div style={{width:44,height:44,borderRadius:'12px',background:'linear-gradient(135deg,#14b8a6,#0f766e)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.4rem'}}>📅</div>
            <div className="panel-header" style={{margin:0}}>Recent activity</div>
          </div>
          <div style={{display:'grid',gap:12}}>
            <div style={{padding:'12px 14px',borderRadius:'10px',background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.1)'}}>
              <div style={{color:'#cbd5e1',fontWeight:700,fontSize:'.9rem',marginBottom:4}}>Jun 18, 2024</div>
              <div style={{color:'#94a3b8',fontSize:'.85rem'}}>Applied for personal loan</div>
            </div>
            <div style={{padding:'12px 14px',borderRadius:'10px',background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.1)'}}>
              <div style={{color:'#cbd5e1',fontWeight:700,fontSize:'.9rem',marginBottom:4}}>May 30, 2024</div>
              <div style={{color:'#94a3b8',fontSize:'.85rem'}}>Payment received</div>
            </div>
            <div style={{padding:'12px 14px',borderRadius:'10px',background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.1)'}}>
              <div style={{color:'#cbd5e1',fontWeight:700,fontSize:'.9rem',marginBottom:4}}>Apr 12, 2024</div>
              <div style={{color:'#94a3b8',fontSize:'.85rem'}}>Profile verified</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
