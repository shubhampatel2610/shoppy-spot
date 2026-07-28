import React from 'react';
import AppConstants from '../../utils/AppConstants';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error:', error, info);
  }

  handleReload = () => {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-3 px-4 text-center">
          <i className="pi pi-exclamation-triangle text-5xl text-red-400" />
          <h1 className="text-lg font-bold text-gray-800">{AppConstants.ERROR_BOUNDARY_TITLE}</h1>
          <p className="text-sm text-gray-500 max-w-md">{AppConstants.ERROR_BOUNDARY_MESSAGE}</p>
          <button
            onClick={this.handleReload}
            className="mt-2 px-4 py-2 bg-[#1e3a5f] text-white text-sm rounded hover:bg-[#162d4a] transition"
          >
            {AppConstants.RELOAD_LABEL}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
