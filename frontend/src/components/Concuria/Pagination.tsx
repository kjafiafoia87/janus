import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalResults: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  darkMode: boolean;
}

export function Pagination({
  currentPage,
  totalResults,
  pageSize,
  onPageChange,
  darkMode,
}: PaginationProps) {
  const totalPages = Math.ceil(totalResults / pageSize);

  const getVisiblePages = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, '...', totalPages];
    if (currentPage >= totalPages - 2) return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const visiblePages = getVisiblePages();

  const baseButton = `px-3 py-2 rounded text-sm font-medium transition`;
  const active = darkMode
    ? 'border border-white text-white bg-gray-800'
    : 'border border-black text-black bg-white';
  const inactive = darkMode
    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
    : 'bg-gray-100 text-gray-700 hover:bg-gray-200';

  const handlePageChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
      <button
        aria-label="Previous page"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${baseButton} ${inactive} disabled:opacity-50`}
      >
        <ChevronLeft size={16} />
      </button>

      {visiblePages.map((page, idx) =>
        typeof page === 'number' ? (
          <button
            key={idx}
            onClick={() => handlePageChange(page)}
            className={`${baseButton} ${currentPage === page ? active : inactive}`}
          >
            {page}
          </button>
        ) : (
          <span key={idx} className={`px-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            ...
          </span>
        )
      )}

      <button
        aria-label="Next page"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${baseButton} ${inactive} disabled:opacity-50`}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
