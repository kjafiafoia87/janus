import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalResults: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalResults, pageSize, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(totalResults / pageSize);

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
      <button
        aria-label="Previous page"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
      >
        <ChevronLeft size={16} />
      </button>

      {visiblePages.map((page, idx) =>
        typeof page === 'number' ? (
          <button
            key={idx}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 rounded ${
              currentPage === page
                ? 'border border-black font-semibold'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={idx} className="px-2">
            ...
          </span>
        )
      )}

      <button
        aria-label="Next page"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded bg-black text-white hover:opacity-90 disabled:opacity-50"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}