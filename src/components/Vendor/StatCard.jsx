import React from 'react';

// Small metric tile used across the dashboard's summary row.
const StatCard = (props) => {
  const { icon, label, value } = props;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-[#1e3a5f]/10 text-[#1e3a5f] flex items-center justify-center shrink-0">
        <i className={`pi ${icon}`} />
      </div>
      <div className="min-w-0">
        <p className="text-lg font-bold text-gray-800 truncate">{value}</p>
        <p className="text-xs text-gray-400">{label}</p>
      </div>
    </div>
  )
}

export default StatCard;
