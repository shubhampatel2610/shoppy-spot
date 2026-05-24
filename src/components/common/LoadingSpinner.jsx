import React from 'react'
import AppConstants from '../../utils/AppConstants';

const LoadingSpinner = (props) => {
  const { message } = props;

  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <i className="pi pi-spin pi-spinner text-4xl text-[#1e3a5f]" />
      <p className="text-gray-500 text-sm">{message || AppConstants.LOADING_MESSAGE}</p>
    </div>
  );
}

export default LoadingSpinner;