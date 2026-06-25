import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  ChartOptions,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

export default function PredictionChart(){
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Eligibility score',
        data: [620, 645, 670, 705],
        fill: true,
        backgroundColor: 'rgba(79, 70, 229, 0.18)',
        borderColor: '#6366f1',
        tension: 0.35,
        pointRadius: 3,
        pointBackgroundColor: '#818cf8',
      },
    ],
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index' as const, intersect: false },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#cbd5e1' } },
      y: { grid: { color: 'rgba(148,163,184,0.16)' }, ticks: { color: '#cbd5e1' } },
    },
  }

  return (
    <div className="chart-card">
      <div className="chart-title">Loan eligibility prediction</div>
      <Line data={data} options={options} />
    </div>
  )
}
