import React, { useEffect, useMemo, useState } from 'react'
import { CUSTOMER, type Offer, OFFERS } from '../services/mockData'
import useDebouncedValue from '../hooks/useDebouncedValue'
import OfferCard from '../components/OfferCard'
import Loading from '../components/Loading'
import ErrorMessage from '../components/Error'
import Empty from '../components/Empty'
import AcceptOfferModal from '../components/AcceptOfferModal'
import { fetchOffers, acceptOffer, notifyOffersUpdated } from '../services/offersService'
import { getSavedScore } from '../services/scoreService'

function clamp(v:number, a:number, b:number){ return Math.max(a, Math.min(b, v)) }

export default function LoanOffers(){
  const [query, setQuery] = useState('')
  const debounced = useDebouncedValue(query, 300)
  const [statusFilter, setStatusFilter] = useState<'all'|'unlocked'|'locked'>('all')

  const [selected, setSelected] = useState<Offer | null>(null)
  const [acceptedId, setAcceptedId] = useState<string | null>(null)
  const [selectedTenure, setSelectedTenure] = useState<string>('any')
  const [selectedInterest, setSelectedInterest] = useState<string>('any')

  const [offers, setOffers] = useState<(Offer & { accepted?: boolean })[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [score, setScore] = useState<number | null>(getSavedScore() ?? CUSTOMER.cibil_score)

  useEffect(()=>{
    setScore(getSavedScore() ?? CUSTOMER.cibil_score)

    let mounted = true
    setLoading(true)
    setError(null)
    fetchOffers()
      .then(list => { if(mounted) setOffers(list as any) })
      .catch(e => { if(mounted) setError(String(e)) })
      .finally(()=> { if(mounted) setLoading(false) })

    const handler = ()=>{
      fetchOffers().then(list => setOffers(list as any)).catch(()=>{})
      setScore(getSavedScore() ?? CUSTOMER.cibil_score)
    }
    window.addEventListener('offersUpdated', handler as EventListener)
    window.addEventListener('scoreUpdated', handler as EventListener)
    return ()=>{ mounted = false; window.removeEventListener('offersUpdated', handler as EventListener); window.removeEventListener('scoreUpdated', handler as EventListener) }
  }, [])

  const currentScore = score ?? CUSTOMER.cibil_score
  const isScoreGateMet = currentScore >= 650
  const unlockedOffers = offers.filter(o => o.min_score_required <= currentScore)
  const lockedOffers = offers.filter(o => o.min_score_required > currentScore)

  const filtered = useMemo(()=>{
    const q = debounced.trim().toLowerCase()
    let list = statusFilter === 'unlocked' ? unlockedOffers : statusFilter === 'locked' ? lockedOffers : offers.slice()
    if(q){ list = list.filter(o => o.lender.toLowerCase().includes(q) || String(o.amount).includes(q)) }
    if(selectedTenure !== 'any'){ const t = Number(selectedTenure); list = list.filter(o => o.tenure_months <= t) }
    if(selectedInterest !== 'any'){ const r = Number(selectedInterest); list = list.filter(o => o.interest_rate <= r) }
    return list
  }, [offers, unlockedOffers, lockedOffers, debounced, selectedTenure, selectedInterest, statusFilter])

  function handleAccept(offer:Offer){ setSelected(offer) }

  function confirmAccept(id:string){
    acceptOffer(id)
    setOffers(prev => prev.map(o => o.id === id ? ({...o, accepted: true}) : o))
    setAcceptedId(id)
    setSelected(null)
    notifyOffersUpdated()
  }

  const sentinel = loading ? null : error ? null : isScoreGateMet ? filtered.length === 0 : false
  const unlockMessage = !isScoreGateMet ? 'Your score must be 650 or higher to view available loan offers.' : 'No offers found with the current filters. Try changing the status or search query.'

  return (
    <div>
      <div className="card search" style={{marginBottom:20}}>
        <input aria-label="Search offers" type="search" placeholder="Search by lender or amount" value={query} onChange={e=>setQuery(e.target.value)} />
        <div style={{display:'flex',gap:12,alignItems:'center',flexWrap:'wrap'}}>
          <div className="muted">{filtered.length} offers</div>
          <select value={statusFilter} onChange={e=> setStatusFilter(e.target.value as any)}>
            <option value="all">All</option>
            <option value="unlocked">Unlocked</option>
            <option value="locked">Locked</option>
          </select>
        </div>
      </div>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {sentinel && <Empty text={unlockMessage} />}

      {!loading && !error && !isScoreGateMet && (
        <div className="card" style={{marginBottom:20}}>
          <div className="stat-title">Score locked</div>
          <p className="muted" style={{marginTop:10}}>You need a CIBIL score of at least 650 to view eligible loan offers.</p>
          <p style={{marginTop:12}}>Current score: <strong>{currentScore}</strong></p>
        </div>
      )}

      {isScoreGateMet && (
        <div className="offer-list">
          {filtered.map(o=> (
            <OfferCard key={o.id} offer={o} currentScore={currentScore} onAccept={handleAccept} />
          ))}
        </div>
      )}

      <AcceptOfferModal offer={selected} onClose={()=> setSelected(null)} onConfirm={confirmAccept} />

      {acceptedId && <div style={{marginTop:16}} className="muted">Last accepted: {acceptedId}</div>}
    </div>
  )
}
