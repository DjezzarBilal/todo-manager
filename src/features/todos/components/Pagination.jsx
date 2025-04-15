import React from 'react';

const Pagination = React.memo(({ currentPage, totalTodos, todosPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalTodos / todosPerPage);

  return (
    <div className="flex justify-center mt-4 gap-2">
      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded ${
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
            aria-label={`Go to page ${page}`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
});

export default Pagination;
