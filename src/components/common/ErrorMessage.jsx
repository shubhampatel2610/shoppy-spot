import React from 'react'
import AppConstants from '../../utils/AppConstants';

const ErrorMessage = (props) => {
  const { message, onRetry } = props;

  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <i className="pi pi-exclamation-triangle text-4xl text-red-400" />
      <p className="text-red-500 font-medium">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 px-4 py-2 bg-[#1e3a5f] text-white text-sm rounded hover:bg-[#162d4a] transition"
        >
          {AppConstants.RETRY_LABEL}
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;