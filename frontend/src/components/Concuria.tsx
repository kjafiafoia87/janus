import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Building2,
  Globe2,
  Search,
  Tag,
  X
} from 'lucide-react';

export default function Concuria({ darkMode }: { darkMode: boolean }) {
  const [filters, setFilters] = useState({
    company: '',
    sector: '',
    language: '',
    dateFrom: '',
    dateTo: ''
  });
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);
  const [availableSectors, setAvailableSectors] = useState<string[]>([]);
  const [availableCompanies, setAvailableCompanies] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/filters')
      .then((res) => res.json())
      .then((data) => {
        setAvailableLanguages(data.languages);
        setAvailableSectors(data.sectors);
        setAvailableCompanies(data.companies);
      })
      .catch((err) => console.error('Error fetching filters:', err));
  }, []);

  return (
    <div className="space-y-4">
      {/* Company Search Input */}
      <div className="relative">
        <label htmlFor="company-search" className="sr-only">Company</label>
        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          id="company-search"
          type="text"
          placeholder="Search Company..."
          className={`w-full pl-10 rounded-md shadow-sm text-sm ${
            darkMode
              ? 'bg-gray-600 border-gray-500 text-gray-200'
              : 'bg-white border-gray-300'
          } focus:border-indigo-500 focus:ring-indigo-500`}
          value={filters.company}
          onChange={(e) => setFilters({ ...filters, company: e.target.value })}
          list="company-options"
        />
        <datalist id="company-options">
          {availableCompanies.map((comp) => (
            <option key={comp} value={comp} />
          ))}
        </datalist>
      </div>

      {/* Sector Search Input */}
      <div className="relative">
        <label htmlFor="sector-search" className="sr-only">Sector</label>
        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          id="sector-search"
          type="text"
          placeholder="Search Sector..."
          className={`w-full pl-10 rounded-md shadow-sm text-sm ${
            darkMode
              ? 'bg-gray-600 border-gray-500 text-gray-200'
              : 'bg-white border-gray-300'
          } focus:border-indigo-500 focus:ring-indigo-500`}
          value={filters.sector}
          onChange={(e) => setFilters({ ...filters, sector: e.target.value })}
          list="sector-options"
        />
        <datalist id="sector-options">
          {availableSectors.map((sec) => (
            <option key={sec} value={sec} />
          ))}
        </datalist>
      </div>

      {/* Language Selector */}
      <div className="relative">
        <label htmlFor="language-select" className="sr-only">Language</label>
        <Globe2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <select
          id="language-select"
          className={`w-full pl-10 rounded-md shadow-sm text-sm ${
            darkMode
              ? 'bg-gray-600 border-gray-500 text-gray-200'
              : 'bg-white border-gray-300'
          } focus:border-indigo-500 focus:ring-indigo-500`}
          value={filters.language}
          onChange={(e) => setFilters({ ...filters, language: e.target.value })}
        >
          <option value="">All Languages</option>
          {availableLanguages.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      {/* Date Filters */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <label htmlFor="date-from" className="sr-only">Start Date</label>
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            id="date-from"
            type="date"
            className={`w-full pl-10 rounded-md shadow-sm text-sm ${
              darkMode
                ? 'bg-gray-600 border-gray-500 text-gray-200'
                : 'bg-white border-gray-300'
            } focus:border-indigo-500 focus:ring-indigo-500`}
            value={filters.dateFrom}
            onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
          />
        </div>
        <div className="relative">
          <label htmlFor="date-to" className="sr-only">End Date</label>
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            id="date-to"
            type="date"
            className={`w-full pl-10 rounded-md shadow-sm text-sm ${
              darkMode
                ? 'bg-gray-600 border-gray-500 text-gray-200'
                : 'bg-white border-gray-300'
            } focus:border-indigo-500 focus:ring-indigo-500`}
            value={filters.dateTo}
            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
