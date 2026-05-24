import React from 'react';
import { observer } from 'mobx-react-lite';
import productStore from '../../stores/productStore';
import AppConstants from '../../utils/AppConstants';

const Pagination = observer(() => {
  const { currentPage, totalPages, setPage } = productStore;

  if (totalPages <= 1) {
    return null;
  }

  const getPages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  }

  const btnBase =
    'flex items-center justify-center rounded text-sm font-medium transition select-none'

  return (
    <div className="flex items-center justify-center gap-1 mt-6 flex-wrap">
      {/* Previous */}
      <button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btnBase} border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed px-3 h-8 gap-1`}
      >
        <i className="pi pi-chevron-left text-xs" />
        {AppConstants.PREVIOUS_LABEL}
      </button>

      {/* Page numbers */}
      {getPages().map((p, i) =>
        p === '...' ? (
          <span key={`dots-${i}`} className="w-8 text-center text-gray-400 text-sm">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`${btnBase} w-8 h-8 ${p === currentPage
              ? 'bg-[#1e3a5f] text-white border border-[#1e3a5f]'
              : 'border border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${btnBase} border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed px-3 h-8 gap-1`}
      >
        {AppConstants.NEXT_LABEL}
        <i className="pi pi-chevron-right text-xs" />
      </button>
    </div>
  )
})

export default Pagination;