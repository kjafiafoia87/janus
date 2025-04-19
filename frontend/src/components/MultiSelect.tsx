import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  darkMode?: boolean;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selected,
  onChange,
  placeholder = 'Select options...',
  darkMode = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = "multi-select-options";

  const filteredOptions = options
  .filter(option =>
    option.toLowerCase().includes(search.toLowerCase()) &&
    !selected.includes(option)
  )
  .sort((a, b) => a.localeCompare(b));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRemove = (optionToRemove: string) => {
    onChange(selected.filter(option => option !== optionToRemove));
  };

  const handleSelect = (option: string) => {
    onChange([...selected, option]);
    setSearch('');
  };

  return (
    <div ref={containerRef} className="relative">
      <div
        className={`min-h-[38px] p-1 rounded-md border ${
          darkMode
            ? 'bg-gray-700 border-gray-600'
            : 'bg-white border-gray-300'
        } cursor-text`}
        onClick={() => setIsOpen(true)}
        aria-label="Multi-select input"
        role="combobox"
        aria-expanded={isOpen ? 'true' : 'false'}
        aria-controls={listboxId}
        tabIndex={0}
      >
        <div className="flex flex-wrap gap-1">
          {selected.map(option => (
            <span
              key={option}
              className={`inline-flex items-center px-2 py-1 rounded-md text-sm ${
                darkMode
                  ? 'bg-gray-600 text-gray-200'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {option}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(option);
                }}
                className="ml-1 hover:text-red-500"
                aria-label={`Remove ${option}`}
                title={`Remove ${option}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <input
            type="text"
            className={`flex-1 outline-none min-w-[60px] ${
              darkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-700'
            }`}
            placeholder={selected.length === 0 ? placeholder : ''}
            aria-label="Search or select options"
            title="Search or select options"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsOpen(true)}
          />
        </div>
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div
          id={listboxId}
          className={`absolute z-10 w-full mt-1 rounded-md shadow-lg max-h-60 overflow-y-auto ${
            darkMode
              ? 'bg-gray-700 border border-gray-600'
              : 'bg-white border border-gray-200'
          }`}
          role="listbox"
        >
          {filteredOptions.map(option => (
            <div
              key={option}
              className={`px-3 py-2 cursor-pointer ${
                darkMode
                  ? 'hover:bg-gray-600 text-gray-200'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              onClick={() => handleSelect(option)}
              role="option"
              tabIndex={0}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;