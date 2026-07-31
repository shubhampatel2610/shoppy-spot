import React from 'react';

// Placeholder avatar shown when no gender is selected yet - dashed outline, no fill
const EmptyPic = (props) => {
  const { size = 96, className = '' } = props;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="No profile picture selected"
    >
      <circle cx="12" cy="12" r="11.25" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="3 2" />
      <circle cx="12" cy="9.5" r="3.5" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
      <path d="M5 19c0-3.6 3.1-6 7-6s7 2.4 7 6" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
    </svg>
  )
}

export default EmptyPic;
