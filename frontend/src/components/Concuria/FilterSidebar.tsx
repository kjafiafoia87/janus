import React from 'react';
import { Filter } from 'lucide-react';
import { Calendar, Globe2 } from 'lucide-react';
import { MultiSelect } from '../MultiSelect';
import { SearchFilters, FilterOptions } from './types';
import { SECTOR_CATEGORIES } from './constantes';

interface Props {
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  availableFilters: FilterOptions;
  darkMode: boolean;
}
const sectorOptions = Object.entries(SECTOR_CATEGORIES).map(
  ([code, label]) => `${code} - ${label}`
);

export function FilterSidebar({ filters, setFilters, availableFilters, darkMode }: Props) {
  return (
    <aside className={`w-64 flex-shrink-0 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r`}>
      <div className="h-full p-4 overflow-y-auto space-y-6">
        <div>
          <h3 className={`flex items-center text-sm font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          <Filter className="h-4 w-4 mr-2" />
            Filters
          </h3>
          <div className="space-y-4">
            {/* Case Number */}
            <div>
              <label htmlFor="case-number" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Case Number
              </label>
              <input
                id="case-number"
                type="text"
                value={filters.case_number}
                onChange={(e) => setFilters({ ...filters, case_number: e.target.value })}
                placeholder="Enter case number"
                className={`w-full rounded-md shadow-sm text-sm ${darkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-200 focus:border-indigo-500 focus:ring-indigo-500'
                  : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
              />
            </div>

            {/* Language */}
            <div>
              <label htmlFor="language-select" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Language
              </label>
              <div className="relative">
                <Globe2 className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                <select
                  id="language-select"
                  className={`w-full pl-10 rounded-md shadow-sm text-sm ${darkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-200 focus:border-indigo-500 focus:ring-indigo-500'
                    : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                  value={filters.language}
                  onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                >
                  <option value="">All Languages</option>
                  <option value="FR">French</option>
                  <option value="EN">English</option>
                </select>
              </div>
            </div>

            {/* Companies */}
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Companies
              </label>
              <MultiSelect
                options={availableFilters.companies || []}
                selected={filters.companies}
                onChange={(selected) => setFilters({ ...filters, companies: selected })}
                placeholder="Select companies"
                darkMode={darkMode}
              />
            </div>

            {/* Label Code Sector (label_code prefix) */}
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Label Code Sector
              </label>
              <MultiSelect
                options={sectorOptions}
                selected={(filters.sector_prefixes || []).map(code => {
                  const label = SECTOR_CATEGORIES[code as keyof typeof SECTOR_CATEGORIES];
                  return `${code} - ${label}`;
                })}
                onChange={(selected) => {
                  const prefixes = selected.map(item => item.split(' - ')[0]);
                  setFilters({ ...filters, sector_prefixes: prefixes });
                }}
                placeholder="Select sectors"
                darkMode={darkMode}
              />
            </div>

            {/* Label Titles */}
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Label Titles
              </label>
              <MultiSelect
                options={availableFilters.label_titles || []}
                selected={filters.label_titles}
                onChange={(selected) => setFilters({ ...filters, label_titles: selected })}
                placeholder="Select Label Titles"
                darkMode={darkMode}
              />
            </div>

            {/* Period */}
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Period
              </label>
              <label
                htmlFor="date-mode-select"
                className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Date filter type
              </label>
              <select
                id="date-mode-select"
                value={filters.date_mode || 'any'}
                onChange={(e) => setFilters({ ...filters, date_mode: e.target.value as any })}
                className={`w-full mb-2 rounded-md shadow-sm text-sm ${darkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-200 focus:border-indigo-500 focus:ring-indigo-500'
                  : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
              >
                <option value="any">All dates</option>
                <option value="after">After</option>
                <option value="before">Before</option>
                <option value="between">Between</option>
              </select>

              {(filters.date_mode === 'after' || filters.date_mode === 'between') && (
                <div className="relative mb-2">
                  <label htmlFor="date-from" className="sr-only">Start date</label>
                  <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                  <input
                    id="date-from"
                    type="date"
                    value={filters.date_from}
                    onChange={(e) => setFilters({ ...filters, date_from: e.target.value })}
                    className={`w-full pl-10 rounded-md shadow-sm text-sm ${darkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200 focus:border-indigo-500 focus:ring-indigo-500'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                  />
                </div>
              )}

              {(filters.date_mode === 'before' || filters.date_mode === 'between') && (
                <div className="relative">
                  <label htmlFor="date-to" className="sr-only">End date</label>
                  <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                  <input
                    id="date-to"
                    type="date"
                    value={filters.date_to}
                    onChange={(e) => setFilters({ ...filters, date_to: e.target.value })}
                    className={`w-full pl-10 rounded-md shadow-sm text-sm ${darkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200 focus:border-indigo-500 focus:ring-indigo-500'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                  />
                </div>
              )}
            </div>

            {/* Reset Button */}
            <button
              onClick={() =>
                setFilters({
                  case_number: '',
                  title: '',
                  companies: [],
                  language: '',
                  date_from: '',
                  date_to: '',
                  date_mode: 'any',
                  label_titles: [],
                  label_codes: [],
                  sector_prefixes: [],
                  text_search: ''
                })
              }
              className={`mt-4 w-full text-sm font-medium px-4 py-2 rounded-md border shadow-sm ${
                darkMode
                  ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}