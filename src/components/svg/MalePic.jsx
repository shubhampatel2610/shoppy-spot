import React from 'react';

// Male profile avatar - blue themed silhouette on a circular badge
const MalePic = (props) => {
  const { size = 96, className = '' } = props;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Male profile picture"
    >
      <circle cx="12" cy="12" r="12" fill="#dbeafe" />
      <circle cx="12" cy="9.5" r="3.5" fill="#2563eb" />
      <path d="M5 19c0-3.6 3.1-6 7-6s7 2.4 7 6" fill="#2563eb" />
    </svg>
  )
}

export default MalePic;
