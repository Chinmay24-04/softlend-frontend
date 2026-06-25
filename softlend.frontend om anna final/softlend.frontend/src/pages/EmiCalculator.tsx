import React, { useMemo, useState } from 'react'

function calcEmi(principal:number, rate:number, months:number){
  const monthlyRate = rate/100/12
  if(monthlyRate<=0) return principal/months
  const x = Math.pow(1+monthlyRate, months)
  return principal * monthlyRate * x / (x-1)
}

export default function EmiCalculator(){
  const [amount, setAmount] = useState(500000)
  const [rate, setRate] = useState(12)
  const [months, setMonths] = useState(60)

  const emi = useMemo(() => calcEmi(amount, rate, months), [amount, rate, months])
  const totalPayable = useMemo(() => emi * months, [emi, months])
  const totalInterest = useMemo(() => totalPayable - amount, [totalPayable, amount])
  
  const amountPercent = Math.round((amount / 5000000) * 100)
  const ratePercent = Math.round((rate / 30) * 100)

  return (
    <div className="dashboard-shell">
      <div className="glass-card" style={{marginBottom:24}}>
        <div className="panel-header">Loan calculator</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:18,marginTop:18}}>
          <div>
            <label style={{display:'block',fontSize:'.85rem',color:'#94a3b8',textTransform:'uppercase',letterSpacing:'.18em',marginBottom:10}}>Loan amount (₹)</label>
            <div style={{display:'flex',alignItems:'center',padding:'12px 14px',border:'1px solid rgba(255,255,255,.08)',borderRadius:'14px',background:'rgba(255,255,255,.04)',marginBottom:8}}>
              <span style={{color:'#94a3b8',marginRight:8}}>₹</span>
              <input type="number" value={amount} onChange={e=> setAmount(Number(e.target.value))} style={{flex:1,border:'none',background:'transparent',color:'#fff',fontSize:'1rem',outline:'none'}} />
            </div>
            <input type="range" min="50000" max="5000000" step="50000" value={amount} onChange={e=> setAmount(Number(e.target.value))} style={{width:'100%',cursor:'pointer'}} />
            <div style={{fontSize:'.8rem',color:'#60a5fa',marginTop:6}}>₹{amount.toLocaleString('en-IN')}</div>
          </div>

          <div>
            <label style={{display:'block',fontSize:'.85rem',color:'#94a3b8',textTransform:'uppercase',letterSpacing:'.18em',marginBottom:10}}>Annual interest rate (%)</label>
            <div style={{display:'flex',alignItems:'center',padding:'12px 14px',border:'1px solid rgba(255,255,255,.08)',borderRadius:'14px',background:'rgba(255,255,255,.04)',marginBottom:8}}>
              <input type="number" value={rate} onChange={e=> setRate(Number(e.target.value))} style={{flex:1,border:'none',background:'transparent',color:'#fff',fontSize:'1rem',outline:'none'}} />
              <span style={{color:'#94a3b8',marginLeft:8}}>%</span>
            </div>
            <input type="range" min="6" max="30" step="0.5" value={rate} onChange={e=> setRate(Number(e.target.value))} style={{width:'100%',cursor:'pointer'}} />
            <div style={{fontSize:'.8rem',color:'#60a5fa',marginTop:6}}>{rate}% p.a.</div>
          </div>

          <div>
            <label style={{display:'block',fontSize:'.85rem',color:'#94a3b8',textTransform:'uppercase',letterSpacing:'.18em',marginBottom:10}}>Tenure (months)</label>
            <div style={{display:'flex',alignItems:'center',padding:'12px 14px',border:'1px solid rgba(255,255,255,.08)',borderRadius:'14px',background:'rgba(255,255,255,.04)',marginBottom:8}}>
              <input type="number" value={months} onChange={e=> setMonths(Number(e.target.value))} style={{flex:1,border:'none',background:'transparent',color:'#fff',fontSize:'1rem',outline:'none'}} />
              <span style={{color:'#94a3b8',marginLeft:8}}>mo</span>
            </div>
            <input type="range" min="6" max="240" step="6" value={months} onChange={e=> setMonths(Number(e.target.value))} style={{width:'100%',cursor:'pointer'}} />
            <div style={{fontSize:'.8rem',color:'#60a5fa',marginTop:6}}>{(months / 12).toFixed(1)} years</div>
          </div>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:18,marginBottom:24}}>
        <div className="glass-card">
          <div className="panel-header" style={{fontSize:'.9rem'}}>Monthly EMI</div>
          <div style={{fontSize:'2.8rem',fontWeight:900,color:'#38bdf8',lineHeight:1,marginTop:12}}>
            ₹{Math.round(emi).toLocaleString('en-IN')}
          </div>
          <div className="muted" style={{marginTop:12,fontSize:'.9rem'}}>Your fixed monthly payment</div>
        </div>

        <div className="glass-card">
          <div className="panel-header" style={{fontSize:'.9rem'}}>Total interest</div>
          <div style={{fontSize:'2.8rem',fontWeight:900,color:'#f97316',lineHeight:1,marginTop:12}}>
            ₹{Math.round(totalInterest).toLocaleString('en-IN')}
          </div>
          <div className="muted" style={{marginTop:12,fontSize:'.9rem'}}>Interest payable over tenure</div>
        </div>

        <div className="glass-card">
          <div className="panel-header" style={{fontSize:'.9rem'}}>Total payable</div>
          <div style={{fontSize:'2.8rem',fontWeight:900,color:'#10b981',lineHeight:1,marginTop:12}}>
            ₹{Math.round(totalPayable).toLocaleString('en-IN')}
          </div>
          <div className="muted" style={{marginTop:12,fontSize:'.9rem'}}>Principal + total interest</div>
        </div>
      </div>

      <div className="glass-card">
        <div className="panel-header">Amortization breakdown</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:16,marginTop:18}}>
          <div style={{padding:'16px',borderRadius:'16px',background:'rgba(255,255,255,.06)'}}>
            <div className="muted" style={{marginBottom:8}}>Principal amount</div>
            <div style={{fontSize:'1.8rem',fontWeight:700,color:'#38bdf8'}}>₹{amount.toLocaleString('en-IN')}</div>
            <div className="progress-wrap small" style={{marginTop:12,background:'rgba(255,255,255,.08)'}}>
              <div className="progress-inner" style={{width:'100%',background:'linear-gradient(90deg,#38bdf8,#22d3ee)'}}></div>
            </div>
          </div>

          <div style={{padding:'16px',borderRadius:'16px',background:'rgba(255,255,255,.06)'}}>
            <div className="muted" style={{marginBottom:8}}>Total interest ({((totalInterest/amount)*100).toFixed(1)}%)</div>
            <div style={{fontSize:'1.8rem',fontWeight:700,color:'#f97316'}}>₹{Math.round(totalInterest).toLocaleString('en-IN')}</div>
            <div className="progress-wrap small" style={{marginTop:12,background:'rgba(255,255,255,.08)'}}>
              <div className="progress-inner" style={{width:`${Math.round((totalInterest/totalPayable)*100)}%`,background:'linear-gradient(90deg,#f97316,#fb923c)'}}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card" style={{marginTop:24}}>
        <div className="panel-header" style={{fontSize:'.95rem',marginBottom:14}}>Tenure comparison</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:12}}>
          <div style={{padding:'14px',borderRadius:'12px',background:'rgba(255,255,255,.08)',border:'1px solid rgba(255,255,255,.12)'}}>
            <div className="muted" style={{fontSize:'.85rem'}}>12 months</div>
            <div style={{fontSize:'1.4rem',fontWeight:700,color:'#fff',marginTop:6}}>₹{Math.round(calcEmi(amount, rate, 12) * 12).toLocaleString('en-IN')}</div>
          </div>
          <div style={{padding:'14px',borderRadius:'12px',background:'rgba(255,255,255,.08)',border:'1px solid rgba(255,255,255,.12)'}}>
            <div className="muted" style={{fontSize:'.85rem'}}>36 months</div>
            <div style={{fontSize:'1.4rem',fontWeight:700,color:'#fff',marginTop:6}}>₹{Math.round(calcEmi(amount, rate, 36) * 36).toLocaleString('en-IN')}</div>
          </div>
          <div style={{padding:'14px',borderRadius:'12px',background:'rgba(34,213,110,.12)',border:'1px solid rgba(34,213,110,.24)'}}>
            <div className="muted" style={{fontSize:'.85rem',color:'#22c55e'}}>Current: {months} months</div>
            <div style={{fontSize:'1.4rem',fontWeight:700,color:'#22c55e',marginTop:6}}>₹{Math.round(totalPayable).toLocaleString('en-IN')}</div>
          </div>
          <div style={{padding:'14px',borderRadius:'12px',background:'rgba(255,255,255,.08)',border:'1px solid rgba(255,255,255,.12)'}}>
            <div className="muted" style={{fontSize:'.85rem'}}>60 months</div>
            <div style={{fontSize:'1.4rem',fontWeight:700,color:'#fff',marginTop:6}}>₹{Math.round(calcEmi(amount, rate, 60) * 60).toLocaleString('en-IN')}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
