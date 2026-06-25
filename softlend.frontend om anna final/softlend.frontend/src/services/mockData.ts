export type ScoreFactor = {
  factor: string
  current_value: string
  ideal_value: string
  impact: 'high' | 'medium' | 'low'
  estimated_score_gain: number
  action: string
}

export type Customer = {
  id: string
  customer_id: string
  name: string
  cibil_score: number
  score_updated_at: string
  email: string
  phone: string
  employment: string
  income_range: string
  address: string
  verification_status: 'Verified' | 'Pending' | 'Review'
  account_completion: number
}

export type Offer = {
  id: string
  lender: string
  amount: number
  tenure_months: number
  interest_rate: number
  processing_fee: number
  emi: number
  min_score_required: number
  status: 'active' | 'inactive'
}

export const CUSTOMER: Customer = {
  id: 'C001',
  customer_id: 'SL-2093',
  name: 'Chinmay Indi',
  cibil_score: 620,
  score_updated_at: '2024-01-10',
  email: 'chinmay.indi@example.com',
  phone: '+91 98765 43210',
  employment: 'Senior Product Manager',
  income_range: '₹18,00,000 - ₹22,00,000',
  address: '2nd Floor, Emerald Court, Whitefield, Bengaluru, KA 560066',
  verification_status: 'Verified',
  account_completion: 84,
}

export const SCORE_FACTORS: ScoreFactor[] = [
  {
    factor: 'Credit utilisation',
    current_value: '87%',
    ideal_value: 'below 30%',
    impact: 'high',
    estimated_score_gain: 35,
    action: 'Pay down your HDFC credit card from ₹43,500 to below ₹15,000',
  },
  {
    factor: 'Missed EMI',
    current_value: '2 missed in 2023',
    ideal_value: '0 missed',
    impact: 'high',
    estimated_score_gain: 25,
    action: 'Clear overdue amount of ₹4,200 on Bajaj Finserv loan',
  },
  {
    factor: 'Credit age',
    current_value: '1.2 years',
    ideal_value: '3+ years',
    impact: 'medium',
    estimated_score_gain: 10,
    action: 'Avoid closing your oldest credit card — let it age',
  },
  {
    factor: 'New enquiries',
    current_value: '3 in last 12 months',
    ideal_value: 'none',
    impact: 'medium',
    estimated_score_gain: 15,
    action: 'Pause new loan applications for the next 6 months',
  },
]

export const OFFERS: Offer[] = [
  {
    id: 'OFF001',
    lender: 'HDFC Bank',
    amount: 500000,
    tenure_months: 36,
    interest_rate: 10.5,
    processing_fee: 2500,
    emi: 16253,
    min_score_required: 700,
    status: 'active',
  },
  {
    id: 'OFF002',
    lender: 'Bajaj Finserv',
    amount: 300000,
    tenure_months: 24,
    interest_rate: 13.0,
    processing_fee: 1500,
    emi: 14274,
    min_score_required: 620,
    status: 'active',
  },
  {
    id: 'OFF003',
    lender: 'ICICI Bank',
    amount: 750000,
    tenure_months: 48,
    interest_rate: 11.0,
    processing_fee: 3000,
    emi: 19317,
    min_score_required: 720,
    status: 'active',
  },
  {
    id: 'OFF004',
    lender: 'Axis Bank',
    amount: 250000,
    tenure_months: 30,
    interest_rate: 12.2,
    processing_fee: 1800,
    emi: 8724,
    min_score_required: 650,
    status: 'active',
  },
  {
    id: 'OFF005',
    lender: 'State Bank',
    amount: 150000,
    tenure_months: 18,
    interest_rate: 14.5,
    processing_fee: 1200,
    emi: 10072,
    min_score_required: 630,
    status: 'active',
  },
]
