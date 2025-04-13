import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Filter } from 'lucide-react';
import { MultiSelect } from './MultiSelect';

interface Document {
  case_number: string;
  title: string;
  companies: string[];
  language: string;
  file_text: string;
  decision_date: string;
  label_codes: string[];
  label_titles: string[];
}

interface SearchFilters {
  case_number: string;
  title: string;
  companies: string[];
  language: string;
  text_search: string;
  date_from: string;
  date_to: string;
  label_codes: string[];
  label_titles: string[];
}

interface FilterOptions {
  languages: string[];
  companies: string[];
  label_codes: string[];
  label_titles: string[];
  case_numbers: string[];
}

export default function Concuria({ darkMode }: { darkMode: boolean }) {
  const [filters, setFilters] = useState<SearchFilters>({
    case_number: '',
    title: '',
    companies: [],
    language: '',
    text_search: '',
    date_from: '',
    date_to: '',
    label_codes: [],
    label_titles: []
  });

  const [availableFilters, setAvailableFilters] = useState<FilterOptions>({
    languages: [],
    companies: [],
    label_codes: [],
    label_titles: [],
    case_numbers: []
  });

  const [searchResults, setSearchResults] = useState<Document[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  const isAnyFilterActive = () => {
    return Object.entries(filters).some(([_, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== '';
    });
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    const shouldSkipSearch = Object.values(filters).every(
      (value) => Array.isArray(value) ? value.length === 0 : value === ''
    );

    if (shouldSkipSearch) {
      fetchAllDocuments();
    } else {
      searchDocuments();
    }
  }, [filters]);

  const fetchFilters = async () => {
    try {
      const response = await axios.get('/api/filters');
      setAvailableFilters(response.data);
    } catch (error) {
      console.error('❌ Error fetching filters:', error);
    }
  };

  const searchDocuments = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/search', filters);
      setSearchResults(response.data.results || []);
      setTotalResults(response.data.total || 0);
    } catch (error) {
      console.error('❌ Error searching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllDocuments = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/search', {});
      setSearchResults(response.data.results || []);
      setTotalResults(response.data.total || 0);
    } catch (error) {
      console.error('❌ Error fetching all documents:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Concuria Search
      </h1>

      {/* Filter panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <input
          type="text"
          value={filters.case_number}
          onChange={(e) => setFilters({ ...filters, case_number: e.target.value })}
          className="p-2 border rounded"
          placeholder="Case number"
          list="case-numbers"
          aria-label="Case number"
        />
        <datalist id="case-numbers">
          {availableFilters.case_numbers?.map((num) => (
            <option key={num} value={num} />
          ))}
        </datalist>

        <input
          type="text"
          value={filters.title}
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          className="p-2 border rounded"
          placeholder="Title"
          aria-label="Title"
        />

        <select
          id="language-select"
          title="Language"
          aria-label="Language"
          value={filters.language}
          onChange={(e) => setFilters({ ...filters, language: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">All Languages</option>
          {['FR', 'EN'].map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>

        <MultiSelect
          options={availableFilters.companies || []}
          selected={filters.companies}
          onChange={(selected) => setFilters({ ...filters, companies: selected })}
          placeholder="Companies"
          darkMode={darkMode}
        />

        <input
          id="date-from"
          type="date"
          aria-label="Date From"
          title="Date From"
          value={filters.date_from}
          onChange={(e) => setFilters({ ...filters, date_from: e.target.value })}
          className="p-2 border rounded"
        />

        <input
          id="date-to"
          type="date"
          aria-label="Date To"
          title="Date To"
          value={filters.date_to}
          onChange={(e) => setFilters({ ...filters, date_to: e.target.value })}
          className="p-2 border rounded"
        />
      </div>

      <div className={`mb-4 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Found {totalResults} result{totalResults !== 1 && 's'}
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Loading...
          </div>
        ) : (
          searchResults.map((doc) => (
            <div
              key={doc.case_number}
              className={`p-4 rounded border shadow-sm ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-200'}`}
            >
              <h2 className="text-lg font-semibold">{doc.title}</h2>
              <p className="text-sm">{doc.case_number} — {doc.decision_date}</p>
              {/* <p className="mt-2 text-sm">{doc.file_text}</p> */}
              <div className="flex flex-wrap gap-2 mt-2">
                {doc.companies?.map((company) => (
                  <span
                    key={company}
                    className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                  >
                    {company}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
