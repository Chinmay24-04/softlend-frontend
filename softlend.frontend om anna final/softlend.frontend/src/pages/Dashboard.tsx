import React, { useEffect, useState } from 'react'
import { CUSTOMER, OFFERS, SCORE_FACTORS } from '../services/mockData'
import { getAcceptedIds } from '../services/offersService'
import { Link } from 'react-router-dom'
import { getSavedScore } from '../services/scoreService'
import CreditGauge from '../components/CreditGauge'
import TrendChart from '../components/TrendChart'
import PredictionChart from '../components/PredictionChart'
import QuickActions from '../components/QuickActions'
import ActivityTimeline from '../components/ActivityTimeline'
import PremiumOfferCard from '../components/PremiumOfferCard'
import AIChatBot from '../components/AIChatBot'

function clamp(v:number, a:number, b:number){ return Math.max(a, Math.min(b, v)) }

function getScoreTier(score:number){
  if(score >= 750) return 'Excellent'
  if(score >= 700) return 'Very Good'
  if(score >= 650) return 'Good'
  if(score >= 600) return 'Fair'
  return 'Needs Attention'
}

function getFactors(score:number) {
  return [
    { title: 'Payment history', value: score >= 700 ? 'Excellent' : score >= 650 ? 'Good' : 'Needs improvement', level: score >= 700 ? 92 : score >= 650 ? 76 : 52, ideal_value: 'On time payments' },
    { title: 'Credit utilization', value: score >= 700 ? 'Low' : score >= 650 ? 'Moderate' : 'High', level: score >= 700 ? 88 : score >= 650 ? 64 : 38, ideal_value: 'Below 30%' },
    { title: 'Credit age', value: score >= 680 ? 'Healthy' : 'Developing', level: score >= 680 ? 72 : 48, ideal_value: '3+ years' },
    { title: 'New inquiries', value: score >= 700 ? 'Minimal' : score >= 650 ? 'Few' : 'Several', level: score >= 700 ? 82 : score >= 650 ? 58 : 34, ideal_value: 'None' },
  ]
}

function getImprovementPlan(score:number) {
  if(score >= 700) {
    return [
      'Continue paying bills on time',
      'Maintain low credit utilization',
      'Keep older credit accounts open',
      'Avoid unnecessary inquiries',
    ]
  }

  return [
    'Pay all bills and EMIs on time',
    'Keep credit usage under 40%',
    'Limit new applications for credit',
    'Review your outstanding balances monthly',
  ]
}

export default function Dashboard(){
  const [offersCount, setOffersCount] = useState(0)
  const [acceptedCount, setAcceptedCount] = useState(0)
  const [bestOffer, setBestOffer] = useState<string | null>(null)
  const [cibil, setCibil] = useState<number | null>(null)

  useEffect(()=>{
    const offers = OFFERS.slice()
    const accepted = getAcceptedIds()
    setAcceptedCount(accepted.length)
    const best = offers.slice().sort((a,b)=> a.interest_rate - b.interest_rate)[0]
    setBestOffer(best ? `${best.lender} — ${best.interest_rate}%` : null)

    const saved = getSavedScore()
    const startingScore = saved ?? 620
    setCibil(startingScore)
    setOffersCount(startingScore >= 650 ? OFFERS.filter(o => o.min_score_required <= startingScore).length : 0)

    const handler = ()=>{
      const acceptedNow = getAcceptedIds()
      setAcceptedCount(acceptedNow.length)
      const savedNow = getSavedScore()
      const nextScore = savedNow ?? 620
      setCibil(nextScore)
      setOffersCount(nextScore >= 650 ? OFFERS.filter(o => o.min_score_required <= nextScore).length : 0)
    }
    window.addEventListener('offersUpdated', handler as EventListener)
    window.addEventListener('scoreUpdated', handler as EventListener)
    return ()=>{
      window.removeEventListener('offersUpdated', handler as EventListener)
      window.removeEventListener('scoreUpdated', handler as EventListener)
    }
  }, [])

  const effective = cibil ?? 0
  const percent = Math.round(((effective - 300) / (900 - 300)) * 100)
  const percentSafe = clamp(percent, 0, 100)
  const scoreTier = getScoreTier(effective)
  const factors = getFactors(effective)
  const plan = getImprovementPlan(effective)
  const recent = OFFERS.slice(0,3)

  return (
    <div className="dashboard-shell">
      <div className="hero-grid">
        <div className="hero-panel">
          <div className="hero-badge">Welcome Chinmay Indi</div>
          <h1>Know your credit power, unlock better loan offers.</h1>
          <p className="hero-copy">Softlend gives you a modern banking-grade experience with live score insights, eligibility forecasts, and premium offer recommendations.</p>
          <div className="hero-kpis">
            <div className="kpi-card accent">
              <span className="kpi-label">CIBIL Score</span>
              <span className="kpi-number">{effective}</span>
            </div>
            <div className="kpi-card">
              <span className="kpi-label">Unlocked offers</span>
              <span className="kpi-number">{offersCount}</span>
            </div>
            <div className="kpi-card">
              <span className="kpi-label">Accepted offers</span>
              <span className="kpi-number">{acceptedCount}</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <CreditGauge score={effective} />
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="glass-card">
          <div className="panel-header">Credit health & improvement</div>
          <div className="health-grid">
            {factors.map(f => (
              <div key={f.title} className="health-card">
                <div className="health-title">{f.title}</div>
                <div className="health-stat">{f.value}</div>
                <div className="health-range">Ideal: {f.ideal_value}</div>
                <div className="progress-wrap small">
                  <div className="progress-inner" style={{width:`${f.level}%`,background:'#34d399'}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <QuickActions />
      </div>

      <div className="dashboard-grid">
        <TrendChart />
        <PredictionChart />
      </div>

      <div className="dashboard-grid">
        <div className="glass-card premium-panel">
          <div className="panel-header">Improvement plan</div>
          <div className="plan-grid">
            {SCORE_FACTORS.map(item => (
              <div key={item.factor} className="plan-card">
                <div className="plan-title">{item.factor}</div>
                <div className="plan-impact">+{item.estimated_score_gain} pts</div>
                <div className="plan-desc">{item.action}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <ActivityTimeline />
          <PremiumOfferCard offer={OFFERS[1]} />
        </div>
      </div>

      <AIChatBot />
    </div>
  )
}

