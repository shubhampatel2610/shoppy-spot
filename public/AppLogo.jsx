import React from 'react';

// A monoline shopping bag (handle loop, strap rivets, and two accent "signal"
// dashes) on a rounded badge — doubles as the navbar logo and favicon source.
const AppLogo = (props) => {
  const { size = 32, className = '' } = props;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="ShoppySpot logo"
    >
      <rect x="0.5" y="0.5" width="23" height="23" rx="6" fill="#1e3a5f" stroke="rgba(255,255,255,0.15)" />

      {/* Handle */}
      <path
        d="M9 9V7a2 2 0 0 1 4 0v2"
        stroke="#ffffff"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="9" cy="9" r="0.55" fill="#ffffff" />
      <circle cx="13" cy="9" r="0.55" fill="#ffffff" />

      {/* Bag body - flat left edge, rounded "D" bulge on the right */}
      <path
        d="M8.7 9 L13.5 9 A3 3 0 0 1 16.5 12 L16.5 14.5 A3 3 0 0 1 13.5 17.5 L8.7 17.5 A1.2 1.2 0 0 1 7.5 16.3 L7.5 10.2 A1.2 1.2 0 0 1 8.7 9 Z"
        stroke="#ffffff"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Accent dashes */}
      <rect x="17.4" y="11.6" width="2.3" height="1" rx="0.5" fill="#f5a524" />
      <rect x="17.4" y="13.9" width="2.3" height="1" rx="0.5" fill="#f5a524" />
    </svg>
  )
}

export default AppLogo;
