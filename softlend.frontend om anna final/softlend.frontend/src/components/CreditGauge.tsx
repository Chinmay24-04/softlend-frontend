import React, { useMemo } from 'react'

const gaugeRadius = 90
const gaugeArcLength = Math.PI * gaugeRadius

function getGaugeColor(score: number) {
  if (score <= 549) return '#ef4444'
  if (score <= 649) return '#f59e0b'
  if (score <= 749) return '#38bdf8'
  return '#22c55e'
}

export default function CreditGauge({ score }: { score: number }) {
  const normalized = useMemo(() => Math.max(0, Math.min(1, (score - 300) / 600)), [score])
  const dashOffset = useMemo(() => gaugeArcLength * (1 - normalized), [normalized])
  const needleAngle = useMemo(() => -90 + 180 * normalized + 6, [normalized])
  const gaugeColor = useMemo(() => getGaugeColor(score), [score])

  return (
    <div className="gauge-card">
      <div className="gauge-header">
        <div className="gauge-score-large">{score}</div>
        <div className="gauge-subtitle">CIBIL Score</div>
      </div>

      <div className="gauge-shell">
        <svg viewBox="0 0 220 120" className="gauge-svg" aria-hidden="true">
          <path d="M20 110 A90 90 0 0 1 200 110" className="gauge-track" />
          <path
            d="M20 110 A90 90 0 0 1 200 110"
            className="gauge-fill"
            style={{
              strokeDasharray: gaugeArcLength,
              strokeDashoffset: dashOffset,
              stroke: gaugeColor,
            }}
          />
          <line
            className="gauge-needle"
            x1="110"
            y1="110"
            x2="110"
            y2="24"
            transform={`rotate(${needleAngle} 110 110)`}
          />
          <polygon
            className="gauge-needle-tip"
            points="110,24 106,34 114,34"
            transform={`rotate(${needleAngle} 110 110)`}
          />
          <circle cx="110" cy="110" r="12" className="gauge-center" />
          <circle cx="110" cy="110" r="5" className="gauge-pivot" />
        </svg>
      </div>

      <div className="gauge-meta">
        <div><span>650</span> Eligible</div>
        <div><span>750</span> Excellent</div>
        <div><span>900</span> Market-leading</div>
      </div>
    </div>
  )
}
