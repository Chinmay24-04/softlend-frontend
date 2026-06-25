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
  Legend,
  ChartOptions,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend)

export default function TrendChart(){
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Credit score',
        data: [620, 635, 645, 660, 675, 690, 705],
        fill: true,
        backgroundColor: 'rgba(56, 189, 248, 0.18)',
        borderColor: '#38bdf8',
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#0ea5e9',
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
      x: { beginAtZero: false, grid: {display:false}, ticks: {color:'#cbd5e1'} },
      y: { beginAtZero: false, grid: {color:'rgba(148,163,184,0.16)'}, ticks: {color:'#cbd5e1'} },
    },
  }

  return (
    <div className="chart-card">
      <div className="chart-title">Credit score trend</div>
      <Line data={data} options={options} />
    </div>
  )
}
