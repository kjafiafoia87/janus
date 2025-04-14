import React from 'react';
import { Search } from 'lucide-react';

export function SearchBar({
  value,
  onChange,
  darkMode
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  darkMode: boolean;
}) {
  return (
    <div className="relative max-w-lg mb-6">
      <label htmlFor="search" className="sr-only">Search documents</label>
      <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
      <input
        id="search"
        type="text"
        placeholder="Search documents..."
        className={`w-full pl-10 pr-4 py-2 rounded-lg shadow-sm ${
          darkMode
            ? 'bg-gray-800 border-gray-700 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
            : 'border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
        }`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}