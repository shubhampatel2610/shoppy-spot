import React from 'react';

// Female profile avatar - pink themed silhouette on a circular badge
const FemalePic = (props) => {
  const { size = 96, className = '' } = props;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Female profile picture"
    >
      <circle cx="12" cy="12" r="12" fill="#fce7f3" />
      <circle cx="12" cy="9.5" r="3.5" fill="#db2777" />
      <path d="M5 19c0-3.6 3.1-6 7-6s7 2.4 7 6" fill="#db2777" />
    </svg>
  )
}

export default FemalePic;
