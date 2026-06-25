import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Mail, Phone, MessageCircle, Zap } from 'lucide-react'

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

const FAQS: FAQ[] = [
  {
    id: '1',
    question: 'What is a CIBIL score and why is it important?',
    answer: 'A CIBIL score (0-900) represents your creditworthiness. Lenders use it to assess lending risk. Higher scores unlock better loan offers with lower interest rates. Maintain timely payments and healthy credit utilization to improve your score.',
    category: 'Credit Score'
  },
  {
    id: '2',
    question: 'How can I improve my credit score?',
    answer: 'Pay all bills on time, keep credit utilization below 30%, maintain diverse credit accounts (credit card, loans), avoid multiple applications, and regularly check for errors in your report.',
    category: 'Credit Score'
  },
  {
    id: '3',
    question: 'What are the eligibility criteria for loans?',
    answer: 'Typical criteria include: Age 21-60 years, monthly income ₹15,000+, CIBIL score 620+, valid KYC documents, and stable employment. Each loan product has specific requirements.',
    category: 'Loans'
  },
  {
    id: '4',
    question: 'What documents do I need for KYC verification?',
    answer: 'You need a government-issued ID (Aadhar/Passport/PAN), address proof (utility bill/lease), PAN card, and mobile verification. Upload these in your Profile section.',
    category: 'KYC'
  },
  {
    id: '5',
    question: 'How is EMI calculated?',
    answer: 'EMI = (P × r × n) / (n-1) where P is principal, r is monthly rate, and n is tenure in months. Our EMI calculator shows you exact amounts for different scenarios.',
    category: 'EMI'
  },
  {
    id: '6',
    question: 'Can I prepay my loan?',
    answer: 'Yes! Most loan products allow partial or full prepayment. Check your loan agreement for prepayment charges. Prepaying reduces total interest paid.',
    category: 'Loans'
  },
  {
    id: '7',
    question: 'How often is my credit score updated?',
    answer: 'Credit scores are typically updated monthly by credit bureaus. Your Softlend score is updated in real-time based on your activities.',
    category: 'Credit Score'
  },
  {
    id: '8',
    question: 'Is my data secure with Softlend?',
    answer: 'Yes! We use bank-grade encryption, comply with data protection laws, and never share your information without consent. Your privacy is our priority.',
    category: 'Security'
  }
]

export default function Support(){
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [ticketForm, setTicketForm] = useState({ name: '', email: '', category: 'General', message: '' })
  const [ticketSubmitted, setTicketSubmitted] = useState(false)

  const filteredFAQs = selectedCategory 
    ? FAQS.filter(faq => faq.category === selectedCategory)
    : FAQS

  const categories = [...new Set(FAQS.map(faq => faq.category))]

  function handleTicketSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTicketSubmitted(true)
    setTimeout(() => setTicketSubmitted(false), 3000)
    setTicketForm({ name: '', email: '', category: 'General', message: '' })
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #040d1f 0%, #050c22 45%, #030609 100%)',
      padding: '60px 20px',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '900',
            color: '#fff',
            margin: '0 0 10px 0',
            letterSpacing: '-0.02em'
          }}>
            Help & Support
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#cbd5e1',
            fontWeight: '500',
            margin: 0
          }}>
            We're here to help you every step of the way
          </p>
        </motion.div>

        {/* Quick Links */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '60px'
        }}>
          {[
            { icon: <Mail size={32} />, title: 'Email Support', text: 'support@softlend.com', time: 'Response in 24h' },
            { icon: <Phone size={32} />, title: 'Call Us', text: '1800-SOFTLEND', time: '9 AM - 9 PM' },
            { icon: <MessageCircle size={32} />, title: 'Live Chat', text: 'Chat with our team', time: '24/7 Available' },
            { icon: <Zap size={32} />, title: 'AI Assistant', text: 'Instant answers', time: 'Always online' }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              style={{
                padding: '25px',
                background: 'linear-gradient(135deg, rgba(59,130,246,.1) 0%, rgba(16,185,129,.05) 100%)',
                border: '1px solid rgba(255,255,255,.1)',
                borderRadius: '16px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
                color: '#38bdf8'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#38bdf8'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff', margin: '0 0 8px 0' }}>{item.title}</h3>
              <p style={{ margin: '0 0 8px 0', color: '#cbd5e1', fontWeight: '600' }}>{item.text}</p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>{item.time}</p>
            </motion.div>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          alignItems: 'start'
        }}>
          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '800',
              color: '#fff',
              marginBottom: '20px',
              letterSpacing: '-0.01em'
            }}>
              Frequently Asked Questions
            </h2>

            {/* Category Filter */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: '25px'
            }}>
              <button
                onClick={() => setSelectedCategory(null)}
                style={{
                  padding: '8px 16px',
                  background: !selectedCategory ? '#3b82f6' : 'rgba(255,255,255,.1)',
                  border: 'none',
                  borderRadius: '20px',
                  color: '#fff',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s'
                }}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '8px 16px',
                    background: selectedCategory === cat ? '#3b82f6' : 'rgba(255,255,255,.1)',
                    border: 'none',
                    borderRadius: '20px',
                    color: '#fff',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* FAQ Items */}
            <div style={{ display: 'grid', gap: '12px' }}>
              {filteredFAQs.map(faq => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  style={{
                    background: 'rgba(255,255,255,.05)',
                    border: '1px solid rgba(255,255,255,.1)',
                    borderRadius: '12px',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: 'transparent',
                      border: 'none',
                      color: '#e2e8f0',
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#38bdf8'}
                    onMouseLeave={e => e.currentTarget.style.color = '#e2e8f0'}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={20}
                      style={{
                        transform: expandedFAQ === faq.id ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s'
                      }}
                    />
                  </button>
                  {expandedFAQ === faq.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{
                        padding: '0 16px 16px 16px',
                        borderTop: '1px solid rgba(255,255,255,.1)',
                        color: '#cbd5e1',
                        lineHeight: '1.6',
                        fontSize: '0.9rem'
                      }}
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Support Ticket Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              padding: '30px',
              background: 'linear-gradient(135deg, rgba(59,130,246,.1) 0%, rgba(16,185,129,.05) 100%)',
              border: '1px solid rgba(255,255,255,.1)',
              borderRadius: '16px'
            }}
          >
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '800',
              color: '#fff',
              marginBottom: '20px',
              letterSpacing: '-0.01em'
            }}>
              Raise a Support Ticket
            </h2>

            {ticketSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{
                  padding: '15px',
                  background: 'rgba(16,185,129,.2)',
                  border: '1px solid #10b981',
                  borderRadius: '10px',
                  color: '#10b981',
                  fontWeight: '600',
                  marginBottom: '20px',
                  fontSize: '0.9rem'
                }}
              >
                ✓ Ticket submitted successfully! We'll respond within 24 hours.
              </motion.div>
            )}

            <form onSubmit={handleTicketSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  color: '#e2e8f0',
                  marginBottom: '8px'
                }}>
                  Your Name
                </label>
                <input
                  type="text"
                  value={ticketForm.name}
                  onChange={e => setTicketForm({ ...ticketForm, name: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'rgba(255,255,255,.08)',
                    border: '1px solid rgba(255,255,255,.1)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  color: '#e2e8f0',
                  marginBottom: '8px'
                }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={ticketForm.email}
                  onChange={e => setTicketForm({ ...ticketForm, email: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'rgba(255,255,255,.08)',
                    border: '1px solid rgba(255,255,255,.1)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  color: '#e2e8f0',
                  marginBottom: '8px'
                }}>
                  Category
                </label>
                <select
                  value={ticketForm.category}
                  onChange={e => setTicketForm({ ...ticketForm, category: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'rgba(255,255,255,.08)',
                    border: '1px solid rgba(255,255,255,.1)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    cursor: 'pointer'
                  }}
                >
                  <option style={{ background: '#0f172a' }}>General Inquiry</option>
                  <option style={{ background: '#0f172a' }}>Technical Issue</option>
                  <option style={{ background: '#0f172a' }}>KYC Problem</option>
                  <option style={{ background: '#0f172a' }}>Loan Status</option>
                  <option style={{ background: '#0f172a' }}>Complaint</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  color: '#e2e8f0',
                  marginBottom: '8px'
                }}>
                  Message
                </label>
                <textarea
                  value={ticketForm.message}
                  onChange={e => setTicketForm({ ...ticketForm, message: e.target.value })}
                  required
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'rgba(255,255,255,.08)',
                    border: '1px solid rgba(255,255,255,.1)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: "'Inter', sans-serif",
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '800',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 8px 24px rgba(59,130,246,0.24)'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Submit Ticket
              </button>
            </form>

            <div style={{
              marginTop: '20px',
              padding: '15px',
              background: 'rgba(255,255,255,.05)',
              borderRadius: '10px',
              fontSize: '0.85rem',
              color: '#cbd5e1'
            }}>
              <strong style={{ color: '#e2e8f0' }}>Ticket #:</strong> AUTO-{Math.floor(Math.random() * 100000)}<br />
              <strong style={{ color: '#e2e8f0' }}>Response time:</strong> 24 hours<br />
              <strong style={{ color: '#e2e8f0' }}>Priority:</strong> Standard
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
