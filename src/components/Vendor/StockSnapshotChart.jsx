import React from 'react';
import { Chart } from 'primereact/chart';
import { LOW_STOCK_THRESHOLD } from '../../stores/vendorProductStore';

// Two-category status split (normal vs low stock), not time-filtered - a live snapshot.
// Split into two sparse datasets so Chart.js draws a proper two-entry legend.
const StockSnapshotChart = (props) => {
  const { products } = props;

  const data = {
    labels: products.map((p) => p.title),
    datasets: [
      {
        label: 'Normal',
        data: products.map((p) => (p.stock >= LOW_STOCK_THRESHOLD ? p.stock : null)),
        backgroundColor: '#2a78d6',
        borderRadius: 4,
        maxBarThickness: 28,
        categoryPercentage: 0.7,
        barPercentage: 0.9,
      },
      {
        label: 'Low stock',
        data: products.map((p) => (p.stock < LOW_STOCK_THRESHOLD ? p.stock : null)),
        backgroundColor: '#d03b3b',
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
      legend: {
        position: 'top',
        align: 'end',
        labels: { color: '#52514e', font: { size: 11 }, usePointStyle: true, pointStyle: 'circle', boxHeight: 8 },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.x} in stock`,
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
      <h2 className="text-sm font-bold text-gray-800 mb-0.5">Inventory Snapshot</h2>
      <p className="text-xs text-gray-400 mb-3">Current stock per product (live, not range-filtered)</p>
      <div style={{ height: products.length > 0 ? `${products.length * 44 + 24}px` : '9rem' }}>
        {products.length > 0 ? (
          <Chart type="bar" data={data} options={options} />
        ) : (
          <div className="h-full flex items-center justify-center text-sm text-gray-400">No active products yet</div>
        )}
      </div>
    </div>
  )
}

export default StockSnapshotChart;
