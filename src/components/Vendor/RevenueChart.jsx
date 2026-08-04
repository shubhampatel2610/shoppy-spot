import React from 'react';
import { Chart } from 'primereact/chart';

// Single time series - one hue, no legend needed (title + axis already name it).
const RevenueChart = (props) => {
  const { series, rangeLabel } = props;

  const data = {
    labels: series.map((s) => s.label),
    datasets: [
      {
        label: 'Revenue',
        data: series.map((s) => Number(s.total.toFixed(2))),
        borderColor: '#2a78d6',
        backgroundColor: 'rgba(42, 120, 214, 0.12)',
        borderWidth: 2,
        pointRadius: series.length > 20 ? 0 : 3,
        pointBackgroundColor: '#2a78d6',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `$${ctx.parsed.y.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#898781', font: { size: 11 }, maxRotation: 0, autoSkip: true },
      },
      y: {
        beginAtZero: true,
        grid: { color: '#e1e0d9' },
        ticks: { color: '#898781', font: { size: 11 }, callback: (v) => `$${v}` },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <h2 className="text-sm font-bold text-gray-800 mb-0.5">Revenue Over Time</h2>
      <p className="text-xs text-gray-400 mb-3">{rangeLabel}</p>
      <div style={{ height: '18rem' }}>
        <Chart type="line" data={data} options={options} />
      </div>
    </div>
  )
}

export default RevenueChart;
