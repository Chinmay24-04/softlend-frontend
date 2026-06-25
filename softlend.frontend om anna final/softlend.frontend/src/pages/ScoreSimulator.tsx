import React, { useEffect, useMemo, useState } from 'react'
import { CUSTOMER, SCORE_FACTORS, OFFERS, type ScoreFactor } from '../services/mockData'
import { getSavedScore, saveScore } from '../services/scoreService'

export default function ScoreSimulator(){
  const initialScore = getSavedScore() ?? 620
  const [income, setIncome] = useState(50000)
  const [existingDebt, setExistingDebt] = useState(0)
  const [applied, setApplied] = useState<number>(initialScore)
  const [selectedActions, setSelectedActions] = useState<Record<string, boolean>>({})

  useEffect(()=>{
    const s = getSavedScore()
    if(s !== null) setApplied(s)
  },[])

  const preview = useMemo(() => Math.max(300, Math.min(900, Math.round(600 + (income - existingDebt) / 1000))), [income, existingDebt])
  const totalActionGain = useMemo(() => Object.entries(selectedActions).reduce((sum,[factor, enabled]) => {
    if(!enabled) return sum
    const item = SCORE_FACTORS.find(s => s.factor === factor)
    return item ? sum + item.estimated_score_gain : sum
  }, 0), [selectedActions])

  const projectedScore = Math.min(900, preview + totalActionGain)
  const scoreImprovement = projectedScore - preview
  const unlockedOffers = OFFERS.filter(o => o.min_score_required <= preview)
  const projectedUnlocks = OFFERS.filter(o => o.min_score_required <= projectedScore)

  function toggleAction(factor:string){
    setSelectedActions(prev => ({...prev, [factor]: !prev[factor]}))
  }

  function applyScore(){
    saveScore(projectedScore)
    setApplied(projectedScore)
    window.dispatchEvent(new Event('scoreUpdated'))
  }

  const scorePercent = Math.round(((preview - 300) / (900 - 300)) * 100)
  const projectedPercent = Math.round(((projectedScore - 300) / (900 - 300)) * 100)

  return (
    <div className="dashboard-shell">
      <div className="glass-card" style={{marginBottom:24}}>
        <div className="panel-header">Income & debt assumptions</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:18,marginTop:18}}>
          <div>
            <label style={{display:'block',fontSize:'.85rem',color:'#94a3b8',textTransform:'uppercase',letterSpacing:'.18em',marginBottom:10}}>Monthly income (₹)</label>
            <div style={{display:'flex',alignItems:'center',padding:'12px 14px',border:'1px solid rgba(255,255,255,.08)',borderRadius:'14px',background:'rgba(255,255,255,.04)'}}>
              <span style={{color:'#94a3b8',marginRight:8}}>₹</span>
              <input type="number" value={income} onChange={e=> setIncome(Number(e.target.value))} style={{flex:1,border:'none',background:'transparent',color:'#fff',fontSize:'1rem',outline:'none'}} />
            </div>
            <div style={{fontSize:'.8rem',color:'#60a5fa',marginTop:6}}>₹{income.toLocaleString('en-IN')}</div>
          </div>
          <div>
            <label style={{display:'block',fontSize:'.85rem',color:'#94a3b8',textTransform:'uppercase',letterSpacing:'.18em',marginBottom:10}}>Existing monthly debt (₹)</label>
            <div style={{display:'flex',alignItems:'center',padding:'12px 14px',border:'1px solid rgba(255,255,255,.08)',borderRadius:'14px',background:'rgba(255,255,255,.04)'}}>
              <span style={{color:'#94a3b8',marginRight:8}}>₹</span>
              <input type="number" value={existingDebt} onChange={e=> setExistingDebt(Number(e.target.value))} style={{flex:1,border:'none',background:'transparent',color:'#fff',fontSize:'1rem',outline:'none'}} />
            </div>
            <div style={{fontSize:'.8rem',color:'#60a5fa',marginTop:6}}>₹{existingDebt.toLocaleString('en-IN')}</div>
          </div>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:18,marginBottom:24}}>
        <div className="glass-card">
          <div className="panel-header" style={{fontSize:'.9rem'}}>Calculated score</div>
          <div style={{fontSize:'3rem',fontWeight:900,color:'#38bdf8',lineHeight:1,marginTop:12}}>
            {preview}
            <span style={{fontSize:'1.2rem',color:'#94a3b8',marginLeft:8}}>/ 900</span>
          </div>
          <div className="progress-wrap small" style={{marginTop:16,background:'rgba(255,255,255,.08)'}}>
            <div className="progress-inner" style={{width:`${scorePercent}%`,background:'linear-gradient(90deg,#38bdf8,#22d3ee)'}}></div>
          </div>
          <div className="muted" style={{marginTop:12,fontSize:'.9rem'}}>Based on income vs debt ratio</div>
        </div>

        <div className="glass-card">
          <div className="panel-header" style={{fontSize:'.9rem'}}>Projected score</div>
          <div style={{fontSize:'3rem',fontWeight:900,color:scoreImprovement > 0 ? '#22c55e' : '#f97316',lineHeight:1,marginTop:12}}>
            {projectedScore}
            <span style={{fontSize:'1.2rem',color:'#94a3b8',marginLeft:8}}>/ 900</span>
          </div>
          <div className="progress-wrap small" style={{marginTop:16,background:'rgba(255,255,255,.08)'}}>
            <div className="progress-inner" style={{width:`${projectedPercent}%`,background:`linear-gradient(90deg,${scoreImprovement > 0 ? '#22c55e' : '#f97316'},${scoreImprovement > 0 ? '#10b981' : '#f97316'})`}}></div>
          </div>
          {scoreImprovement > 0 && <div style={{marginTop:12,fontSize:'.9rem',color:'#22c55e',fontWeight:700}}>+{scoreImprovement} points improvement</div>}
        </div>

        <div className="glass-card">
          <div className="panel-header" style={{fontSize:'.9rem'}}>Saved score</div>
          <div style={{fontSize:'3rem',fontWeight:900,color:'#7dd3fc',lineHeight:1,marginTop:12}}>
            {applied}
          </div>
          <div className="muted" style={{marginTop:18,fontSize:'.9rem'}}>Used by dashboard & offers</div>
        </div>
      </div>

      <div className="glass-card" style={{marginBottom:24}}>
        <div className="panel-header">What if? Improvement actions</div>
        <div className="muted" style={{marginTop:12,marginBottom:20}}>Toggle actions you would complete to see projected score impact.</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:16}}>
          {SCORE_FACTORS.map((factor: ScoreFactor) => (
            <div key={factor.factor} style={{padding:'20px',borderRadius:'20px',background:selectedActions[factor.factor] ? 'rgba(34,213,110,.12)' : 'rgba(255,255,255,.05)',border:`1px solid ${selectedActions[factor.factor] ? 'rgba(34,213,110,.24)' : 'rgba(255,255,255,.08)'}`,transition:'all .25s ease',cursor:'pointer'}} onClick={()=> toggleAction(factor.factor)}>
              <label style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:14,cursor:'pointer',marginBottom:12}}>
                <span style={{fontWeight:700,color:'#fff'}}>{factor.factor}</span>
                <input type="checkbox" checked={!!selectedActions[factor.factor]} onChange={()=>{}} style={{cursor:'pointer',width:20,height:20}} />
              </label>
              <p style={{margin:'0 0 14px',fontSize:'.95rem',color:'#cbd5e1',lineHeight:1.6}}>{factor.action}</p>
              <div style={{display:'grid',gap:8}}>
                <div style={{fontSize:'.85rem'}}><strong style={{color:selectedActions[factor.factor] ? '#22c55e' : '#38bdf8'}}>+{factor.estimated_score_gain} points</strong> <span className="muted">if completed</span></div>
                <div style={{fontSize:'.85rem',color:'#94a3b8'}}>Ideal: <strong>{factor.ideal_value}</strong></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:18,marginBottom:24}}>
        <div className="glass-card">
          <div className="panel-header" style={{fontSize:'.9rem'}}>Offers now</div>
          <div style={{fontSize:'2.6rem',fontWeight:900,color:'#38bdf8',lineHeight:1,marginTop:12}}>{unlockedOffers.length}</div>
          <div className="muted" style={{marginTop:12,fontSize:'.9rem'}}>At calculated score</div>
        </div>
        <div className="glass-card">
          <div className="panel-header" style={{fontSize:'.9rem'}}>Offers projected</div>
          <div style={{fontSize:'2.6rem',fontWeight:900,color:projectedUnlocks.length > unlockedOffers.length ? '#22c55e' : '#38bdf8',lineHeight:1,marginTop:12}}>{projectedUnlocks.length}</div>
          <div className="muted" style={{marginTop:12,fontSize:'.9rem'}}>At projected score</div>
        </div>
      </div>

      <div style={{display:'flex',gap:14,flexWrap:'wrap',alignItems:'center'}}>
        <button className="btn btn-accent" onClick={applyScore} style={{flex:'0 1 auto',padding:'14px 26px'}}>Apply projected score</button>
        {projectedScore > applied && <span style={{color:'#22c55e',fontWeight:700}}>Ready to save +{projectedScore - applied} pts</span>}
      </div>
    </div>
  )
}
