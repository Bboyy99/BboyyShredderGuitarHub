'use client';

interface CoverFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function CoverFilters({ activeFilter, onFilterChange }: CoverFiltersProps) {
  const filters = [
    { id: 'all', label: 'All Covers' },
    { id: 'metallica', label: 'Metallica' },
    { id: 'blues', label: 'Blues' },
    { id: 'original', label: 'Original' },
  ];

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 mb-8">
      <div className="flex flex-wrap gap-4 justify-center">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`px-4 py-2 rounded-lg border transition-all ${
              activeFilter === filter.id
                ? 'bg-blue-600/20 text-blue-400 border-blue-500/30'
                : 'bg-gray-800/50 text-gray-300 border-gray-700/50 hover:bg-gray-700/50'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
} 