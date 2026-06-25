import React from 'react'
import type { Offer } from '../services/mockData'

export default function PremiumOfferCard({offer}:{offer:Offer}){
  return (
    <div className="premium-offer-card">
      <div className="premium-header">
        <div>
          <div className="premium-title">Premium offer</div>
          <div className="premium-bank">{offer.lender}</div>
        </div>
        <div className="premium-rate">{offer.interest_rate}%</div>
      </div>
      <div className="premium-body">
        <div className="premium-amount">₹{offer.amount.toLocaleString()}</div>
        <div className="premium-details">{offer.tenure_months} months • ₹{offer.emi.toLocaleString()} EMI</div>
      </div>
      <div className="premium-footer">
        <div>
          <div className="premium-label">Processing fee</div>
          <div className="premium-value">₹{offer.processing_fee.toLocaleString()}</div>
        </div>
        <button className="btn btn-primary">Accept now</button>
      </div>
    </div>
  )
}
