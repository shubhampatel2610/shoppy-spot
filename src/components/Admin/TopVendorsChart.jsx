import React from 'react';
import { Chart } from 'primereact/chart';

// Ranked magnitude, single series - same shape as the vendor side's TopProductsChart,
// just ranking stores by revenue instead of products by units sold.
const TopVendorsChart = (props) => {
  const { vendors } = props;

  const data = {
    labels: vendors.map((v) => v.name),
    datasets: [
      {
        label: 'Revenue',
        data: vendors.map((v) => v.revenue),
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
          label: (ctx) => `$${ctx.parsed.x.toFixed(2)} revenue`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { color: '#898781', font: { size: 11 }, callback: (v) => `$${v}` },
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
      <h2 className="text-sm font-bold text-gray-800 mb-0.5">Top Vendors</h2>
      <p className="text-xs text-gray-400 mb-3">Ranked by revenue in range</p>
      <div style={{ height: vendors.length > 0 ? `${vendors.length * 44}px` : '9rem' }}>
        {vendors.length > 0 ? (
          <Chart type="bar" data={data} options={options} />
        ) : (
          <div className="h-full flex items-center justify-center text-sm text-gray-400">No sales in this range</div>
        )}
      </div>
    </div>
  )
}

export default TopVendorsChart;
