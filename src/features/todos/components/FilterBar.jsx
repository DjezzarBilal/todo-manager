import React from 'react';

const FilterBar = ({ currentFilter, onFilterChange, search, onSearchChange }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border p-2 rounded w-full sm:w-1/2"
      />

      {/* Filter Buttons */}
      <div className="flex gap-2">
        {['all', 'completed', 'incomplete'].map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-3 py-1 rounded border ${
              currentFilter === filter
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700'
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
