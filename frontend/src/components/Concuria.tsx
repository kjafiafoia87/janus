import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Filter, Search, Calendar, Globe2 } from 'lucide-react';
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
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className={`w-64 flex-shrink-0 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r`}>
        <div className="h-full p-4 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h3 className={`flex items-center text-sm font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </h3>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Case Number
                  </label>
                  <input 
                    type="text"
                    value={filters.case_number}
                    onChange={(e) => setFilters({ ...filters, case_number: e.target.value })}
                    placeholder="Enter case number"
                    className={`w-full rounded-md shadow-sm text-sm ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-gray-200 focus:border-indigo-500 focus:ring-indigo-500'
                        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Title
                  </label>
                  <input 
                    type="text"
                    value={filters.title}
                    onChange={(e) => setFilters({ ...filters, title: e.target.value })}
                    placeholder="Document title"
                    className={`w-full rounded-md shadow-sm text-sm ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-gray-200 focus:border-indigo-500 focus:ring-indigo-500'
                        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Language
                  </label>
                  <div className="relative">
                    <Globe2 className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                    <label htmlFor="language-select" className="...">Language</label>
                    <select
                      id="language-select"
                      className={`w-full pl-10 rounded-md shadow-sm text-sm ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-gray-200 focus:border-indigo-500 focus:ring-indigo-500'
                          : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                      }`}
                      value={filters.language}
                      onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                    >
                      <option value="">All Languages</option>
                      <option value="FR">French</option>
                      <option value="EN">English</option>
                    </select>
                  </div>
                </div>
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
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Period
                  </label>
                  <div className="space-y-2">
                    <div className="relative">
                      <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                      
                      <label htmlFor="date-from" className="...">Period</label>
                      <input
                        id="date-from"
                        type="date"
                        className={`w-full pl-10 rounded-md shadow-sm text-sm ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-gray-200 focus:border-indigo-500 focus:ring-indigo-500'
                            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                        }`}
                        value={filters.date_from}
                        onChange={(e) => setFilters({ ...filters, date_from: e.target.value })}
                      />
                    </div>
                    <div className="relative">
                      <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                      <input
                        id="date-to"
                        type="date"
                        className={`w-full pl-10 rounded-md shadow-sm text-sm ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-gray-200 focus:border-indigo-500 focus:ring-indigo-500'
                            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                        }`}
                        value={filters.date_to}
                        onChange={(e) => setFilters({ ...filters, date_to: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className={`flex-1 flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="p-6 flex-1">
          <div className="mb-6">
            <div className="relative max-w-lg">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search documents..."
                className={`w-full pl-10 pr-4 py-2 rounded-lg shadow-sm ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                    : 'border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                }`}
                value={filters.text_search}
                onChange={(e) => setFilters({ ...filters, text_search: e.target.value })}
              />
            </div>
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
                  <p className="text-sm">
                    {doc.case_number} — {doc.decision_date}
                  </p>
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
      </main>
    </div>
  );
}