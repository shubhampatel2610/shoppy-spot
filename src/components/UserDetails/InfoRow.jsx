import React from 'react';
import AppConstants from '../../utils/AppConstants';

// Label + value pair used to display a single read-only user/address field
const InfoRow = (props) => {
  const { label, value } = props;

  return (
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm text-gray-800 font-medium">{value || AppConstants.NOT_PROVIDED_TEXT}</p>
    </div>
  )
}

export default InfoRow;
