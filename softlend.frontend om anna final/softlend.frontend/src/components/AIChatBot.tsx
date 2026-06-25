import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'bot'
  text: string
  timestamp: Date
}

const QUICK_ACTIONS = [
  { text: 'How can I improve my score?', icon: '📈' },
  { text: 'Best loan offers', icon: '🏦' },
  { text: 'Check EMI', icon: '💰' },
  { text: 'Contact support', icon: '📞' }
]

const BOT_RESPONSES: { [key: string]: string } = {
  'score': 'Your CIBIL score determines your creditworthiness. A higher score unlocks better loan offers with lower interest rates. Improve it by paying bills on time, reducing credit utilization, and maintaining a healthy credit mix.',
  'loan': 'Based on your profile, you have 5 available loan offers ranging from ₹50,000 to ₹50 lakhs. Each offer has different interest rates and eligibility criteria. Check the Loan Offers page for details!',
  'emi': 'EMI Calculator helps you understand monthly payments for different loan amounts, rates, and tenures. Use sliders to explore various scenarios and find the perfect fit for your budget.',
  'contact': 'You can reach our support team via:\n📧 support@softlend.com\n📞 1800-SOFTLEND\n💬 Chat support (available 24/7)',
  'kc': 'KYC verification ensures compliance and helps us provide personalized financial services. Upload your ID, PAN, address proof, and verify your mobile to complete KYC.',
  'improve': 'Improve your credit score by:\n✓ Paying all bills on time\n✓ Keeping credit utilization below 30%\n✓ Maintaining diverse credit accounts\n✓ Avoiding multiple loan applications',
  'eligibility': 'Your current score is 620, which makes you eligible for most loan products. Higher scores unlock premium offers with better interest rates.',
  'default': 'I can help you with credit score questions, loan information, EMI calculations, KYC process, and more. What would you like to know?'
}

function getBotResponse(userInput: string): string {
  const input = userInput.toLowerCase()
  if (input.includes('score') || input.includes('cibil')) return BOT_RESPONSES['score']
  if (input.includes('loan') || input.includes('offer')) return BOT_RESPONSES['loan']
  if (input.includes('emi') || input.includes('calculate')) return BOT_RESPONSES['emi']
  if (input.includes('contact') || input.includes('support') || input.includes('phone')) return BOT_RESPONSES['contact']
  if (input.includes('kyc') || input.includes('verification')) return BOT_RESPONSES['kc']
  if (input.includes('improve')) return BOT_RESPONSES['improve']
  if (input.includes('eligible') || input.includes('eligibility')) return BOT_RESPONSES['eligibility']
  return BOT_RESPONSES['default']
}

export default function AIChatBot(){
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: "👋 Hi! I'm your financial assistant. How can I help you today?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  function handleQuickAction(text: string) {
    const userMsg: Message = {
      id: String(messages.length),
      type: 'user',
      text,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const botMsg: Message = {
        id: String(messages.length + 1),
        type: 'bot',
        text: getBotResponse(text),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMsg])
      setIsTyping(false)
    }, 800)
  }

  function handleSendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return

    const userMsg: Message = {
      id: String(messages.length),
      type: 'user',
      text: input,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const botMsg: Message = {
        id: String(messages.length + 1),
        type: 'bot',
        text: getBotResponse(input),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMsg])
      setIsTyping(false)
    }, 800)
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              bottom: '100px',
              right: '20px',
              width: '100%',
              maxWidth: '380px',
              height: '500px',
              background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,.1)',
              boxShadow: '0 20px 60px rgba(0,0,0,.4)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 9999,
              backdropFilter: 'blur(20px)'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '16px',
              borderBottom: '1px solid rgba(255,255,255,.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: '800', color: '#fff' }}>Softlend Assistant</div>
                <div style={{ fontSize: '0.75rem', color: '#60a5fa', fontWeight: '500' }}>Always here to help</div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'rgba(255,255,255,.1)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '6px',
                  cursor: 'pointer',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: 'flex',
                    justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{
                    maxWidth: '80%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    background: msg.type === 'user' 
                      ? 'linear-gradient(135deg, #3b82f6, #1e40af)' 
                      : 'rgba(255,255,255,.08)',
                    color: '#fff',
                    fontSize: '0.9rem',
                    lineHeight: '1.4',
                    border: msg.type === 'bot' ? '1px solid rgba(255,255,255,.1)' : 'none'
                  }}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center',
                    padding: '12px 14px',
                    background: 'rgba(255,255,255,.08)',
                    borderRadius: '12px',
                    width: 'fit-content',
                    border: '1px solid rgba(255,255,255,.1)'
                  }}
                >
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#60a5fa'
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && !isTyping && (
              <div style={{
                padding: '12px',
                borderBottom: '1px solid rgba(255,255,255,.1)',
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '8px'
              }}>
                {QUICK_ACTIONS.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickAction(action.text)}
                    style={{
                      padding: '10px 12px',
                      background: 'rgba(255,255,255,.08)',
                      border: '1px solid rgba(255,255,255,.1)',
                      borderRadius: '10px',
                      color: '#e2e8f0',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.3s',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(59,130,246,.2)'
                      e.currentTarget.style.borderColor = '#3b82f6'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,.08)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)'
                    }}
                  >
                    {action.icon} {action.text}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSendMessage} style={{
              padding: '12px',
              borderTop: '1px solid rgba(255,255,255,.1)',
              display: 'flex',
              gap: '8px'
            }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask me anything..."
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  background: 'rgba(255,255,255,.08)',
                  border: '1px solid rgba(255,255,255,.1)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'all 0.3s'
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = '#3b82f6'
                  e.currentTarget.style.background = 'rgba(255,255,255,.12)'
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)'
                  e.currentTarget.style.background = 'rgba(255,255,255,.08)'
                }}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                style={{
                  padding: '10px 14px',
                  background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#fff',
                  cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed',
                  opacity: input.trim() && !isTyping ? 1 : 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={!isOpen ? { y: [0, -10, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
          border: 'none',
          color: '#fff',
          fontSize: '1.5rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 30px rgba(59,130,246,0.4)',
          zIndex: 9998,
          fontFamily: "'Inter', sans-serif"
        }}
      >
        <MessageCircle size={28} />
      </motion.button>
    </>
  )
}
