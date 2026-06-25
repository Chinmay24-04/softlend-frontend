import React from 'react'
import type { Offer } from '../services/mockData'

export default function AcceptOfferModal({offer, onClose, onConfirm}:{
  offer?: Offer | null,
  onClose: ()=>void,
  onConfirm: (id:string)=>void
}){
  if(!offer) return null
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Accept Offer</h3>
        <p>You're about to accept an offer from <b>{offer.lender}</b> for ₹{offer.amount.toLocaleString()} at {offer.interest_rate}%.</p>
        <div className="modal-actions">
          <button className="btn btn-primary" onClick={()=> onConfirm(offer.id)}>Confirm</button>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
