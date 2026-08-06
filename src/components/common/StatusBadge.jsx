import React from 'react';

// Generic pill badge - caller supplies the status text and its color classes via
// a colorMap (e.g. PRODUCT_STATUS_BADGE_CLASS / ORDER_STATUS_BADGE_CLASS), so the
// same badge renders product statuses, order item statuses, or any future status set.
const StatusBadge = (props) => {
  const { status, colorMap, className = '' } = props;

  return (
    <span className={`text-[10px] font-semibold uppercase tracking-wide rounded-full px-2.5 py-1 shrink-0 ${colorMap[status] ?? 'bg-gray-100 text-gray-600'} ${className}`}>
      {status}
    </span>
  )
}

export default StatusBadge;
