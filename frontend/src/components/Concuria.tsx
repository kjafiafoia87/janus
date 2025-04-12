import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Building2,
  Globe2,
  Tag,
  Search,
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

  // Exemple de récupération dynamique des options de filtres depuis votre index Elasticsearch
  useEffect(() => {
    // Appel vers un endpoint qui retourne par exemple { languages: string[], sectors: string[] }
    fetch('/api/filters')
      .then((res) => res.json())
      .then((data) => {
        setAvailableLanguages(data.languages);
        setAvailableSectors(data.sectors);
      })
      .catch((err) => console.error('Error fetching filters:', err));
  }, []);

  return (
    <div className="space-y-2">
      {/* Date de début */}
      <div className="relative">
        <label htmlFor="date-from" className="sr-only">
          Start Date
        </label>
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          id="date-from"
          type="date"
          aria-label="Start Date"
          className={`w-full pl-10 rounded-md shadow-sm text-sm ${
            darkMode
              ? 'bg-gray-600 border-gray-500 text-gray-200 focus:border-indigo-500 focus:ring-indigo-500'
              : 'bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          }`}
          value={filters.dateFrom}
          onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
        />
      </div>

      {/* Date de fin */}
      <div className="relative">
        <label htmlFor="date-to" className="sr-only">
          End Date
        </label>
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          id="date-to"
          type="date"
          aria-label="End Date"
          className={`w-full pl-10 rounded-md shadow-sm text-sm ${
            darkMode
              ? 'bg-gray-600 border-gray-500 text-gray-200 focus:border-indigo-500 focus:ring-indigo-500'
              : 'bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          }`}
          value={filters.dateTo}
          onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
        />
      </div>

      {/* Sélecteur de Secteur basé sur les label_codes distincts */}
      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <label
          htmlFor="sector-select"
          className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
        >
          Sector
        </label>
        <select
          id="sector-select"
          aria-label="Sector"
          className={`w-full rounded-md shadow-sm text-sm ${
            darkMode
              ? 'bg-gray-600 border-gray-500 text-gray-200 focus:border-indigo-500 focus:ring-indigo-500'
              : 'bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          }`}
          value={filters.sector}
          onChange={(e) => setFilters({ ...filters, sector: e.target.value })}
        >
          <option value="">All Sectors</option>
          {availableSectors.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>
      </div>

      {/* Sélecteur de Langue basé sur les langues distinctes */}
      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <label
          htmlFor="language-select"
          className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
        >
          Language
        </label>
        <div className="relative">
          <Globe2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            id="language-select"
            aria-label="Language"
            className={`w-full pl-10 rounded-md shadow-sm text-sm ${
              darkMode
                ? 'bg-gray-600 border-gray-500 text-gray-200 focus:border-indigo-500 focus:ring-indigo-500'
                : 'bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
            }`}
            value={filters.language}
            onChange={(e) => setFilters({ ...filters, language: e.target.value })}
          >
            <option value="">All Languages</option>
            {availableLanguages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}