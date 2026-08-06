import React from 'react';
import { Chart } from 'primereact/chart';

// Fixed categorical palette, cycled by index - unlike OrderStatusChart's STATUS_META
// (status is the entity there, so colors carry meaning), a category has no inherent
// color, so any distinguishable rotation works.
const PALETTE = ['#2a78d6', '#0ca30c', '#fab219', '#4a3aa7', '#d03b3b', '#0e9488', '#c2410c'];

const CategoryDistributionChart = (props) => {
  const { categories } = props;
  const total = categories.reduce((sum, c) => sum + c.count, 0);

  const data = {
    labels: categories.map((c) => c.name),
    datasets: [
      {
        data: categories.map((c) => c.count),
        backgroundColor: categories.map((_, i) => PALETTE[i % PALETTE.length]),
        borderColor: '#fcfcfb',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    cutout: '62%',
    plugins: {
      legend: {
        position: 'right',
        labels: { color: '#52514e', font: { size: 11 }, usePointStyle: true, pointStyle: 'circle' },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const pct = total ? Math.round((ctx.parsed / total) * 100) : 0;
            return ` ${ctx.label}: ${ctx.parsed} (${pct}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <h2 className="text-sm font-bold text-gray-800 mb-0.5">Products by Category</h2>
      <p className="text-xs text-gray-400 mb-3">{total} active product{total !== 1 ? 's' : ''} platform-wide</p>
      <div style={{ height: '18rem' }}>
        {total > 0 ? (
          <Chart type="doughnut" data={data} options={options} />
        ) : (
          <div className="h-full flex items-center justify-center text-sm text-gray-400">No active products yet</div>
        )}
      </div>
    </div>
  )
}

export default CategoryDistributionChart;
