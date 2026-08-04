import React from 'react';
import { Chart } from 'primereact/chart';

// Status is the entity here, so status colors (good/warning/critical) take priority;
// the two "in progress" states borrow distinct categorical hues since they aren't
// inherently good or bad.
const STATUS_META = [
  { key: 'pending', label: 'Pending', color: '#fab219' },
  { key: 'packed', label: 'Packed', color: '#2a78d6' },
  { key: 'shipped', label: 'Shipped', color: '#4a3aa7' },
  { key: 'delivered', label: 'Delivered', color: '#0ca30c' },
  { key: 'cancelled', label: 'Cancelled', color: '#d03b3b' },
];

const OrderStatusChart = (props) => {
  const { counts } = props;
  const total = STATUS_META.reduce((sum, s) => sum + counts[s.key], 0);

  const data = {
    labels: STATUS_META.map((s) => s.label),
    datasets: [
      {
        data: STATUS_META.map((s) => counts[s.key]),
        backgroundColor: STATUS_META.map((s) => s.color),
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
      <h2 className="text-sm font-bold text-gray-800 mb-0.5">Orders by Status</h2>
      <p className="text-xs text-gray-400 mb-3">{total} order item{total !== 1 ? 's' : ''} in range</p>
      <div style={{ height: '18rem' }}>
        {total > 0 ? (
          <Chart type="doughnut" data={data} options={options} />
        ) : (
          <div className="h-full flex items-center justify-center text-sm text-gray-400">No orders in this range</div>
        )}
      </div>
    </div>
  )
}

export default OrderStatusChart;
