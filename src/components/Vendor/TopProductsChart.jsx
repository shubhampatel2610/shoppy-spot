import React from 'react';
import { Chart } from 'primereact/chart';

// Ranked magnitude, single series - one hue, no legend needed.
const TopProductsChart = (props) => {
  const { products } = props;

  const data = {
    labels: products.map((p) => p.title),
    datasets: [
      {
        label: 'Units sold',
        data: products.map((p) => p.units),
        backgroundColor: '#2a78d6',
        borderRadius: 4,
        maxBarThickness: 28,
        categoryPercentage: 0.7,
        barPercentage: 0.9,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    layout: { padding: 0 },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.parsed.x} unit${ctx.parsed.x !== 1 ? 's' : ''} sold`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { color: '#898781', font: { size: 11 }, precision: 0 },
        grid: { color: '#e1e0d9' },
      },
      y: {
        ticks: { color: '#52514e', font: { size: 11 } },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <h2 className="text-sm font-bold text-gray-800 mb-0.5">Top Selling Products</h2>
      <p className="text-xs text-gray-400 mb-3">Ranked by units sold in range</p>
      <div style={{ height: products.length > 0 ? `${products.length * 44}px` : '9rem' }}>
        {products.length > 0 ? (
          <Chart type="bar" data={data} options={options} />
        ) : (
          <div className="h-full flex items-center justify-center text-sm text-gray-400">No sales in this range</div>
        )}
      </div>
    </div>
  )
}

export default TopProductsChart;
