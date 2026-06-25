import React from 'react'
import type { Offer } from '../services/mockData'

export default function OfferCard({offer, currentScore, onAccept}:{offer:Offer & { accepted?: boolean }; currentScore:number; onAccept:(o:Offer)=>void}){
  const accepted = !!offer.accepted
  const locked = currentScore < offer.min_score_required
  const statusLabel = accepted ? 'Accepted' : locked ? 'Locked' : 'Unlocked'
  const badgeColor = accepted ? '#16a34a' : locked ? '#4b5563' : '#22c55e'

  return (
    <div className="card offer-card">
      <div style={{position:'absolute',right:18,top:18,padding:'6px 12px',borderRadius:999,background:badgeColor,color:'#fff',fontSize:12,fontWeight:700,textTransform:'uppercase'}}>{statusLabel}</div>
      <h3 style={{marginTop:0}}>{offer.lender}</h3>
      <p>Amount: ₹{offer.amount.toLocaleString()}</p>
      <p>Tenure: {offer.tenure_months} months</p>
      <p>Interest: {offer.interest_rate}%</p>
      <p>EMI: ₹{offer.emi.toLocaleString()}</p>
      <p className="muted">Min score required: {offer.min_score_required}</p>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:16,gap:12}}>
        <button className={locked || accepted ? 'btn btn-secondary' : 'btn btn-primary'} onClick={()=> onAccept(offer)} disabled={locked || accepted} style={locked||accepted?{opacity:0.6,cursor:'not-allowed'}:{}}>
          {accepted ? 'Accepted' : locked ? `Fix score to ${offer.min_score_required}` : 'Accept offer'}
        </button>
        {locked && <span className="muted">Unlock by improving score</span>}
      </div>
    </div>
  )
}
