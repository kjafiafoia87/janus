import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SearchBar } from './SearchBar';
import { ResultsList } from './ResultsList';
import { FilterSidebar } from './FilterSidebar';
import { Document, FilterOptions, SearchFilters } from './types';
import { Pagination } from './Pagination';

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
    label_titles: [],
  });

  const [availableFilters, setAvailableFilters] = useState<FilterOptions>({
    languages: [],
    companies: [],
    label_codes: [],
    label_titles: [],
    case_numbers: [],
  });

  const [searchResults, setSearchResults] = useState<Document[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

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
  }, [filters, currentPage]);

  const fetchFilters = async () => {
    try {
      const response = await axios.get<FilterOptions>('/api/filters');
      setAvailableFilters(response.data);
    } catch (error) {
      console.error('❌ Error fetching filters:', error);
    }
  };

  const searchDocuments = async () => {
    try {
      setLoading(true);
      const response = await axios.post<{ results: Document[]; total: number }>('/api/search', {
        ...filters,
        page: currentPage,
        pageSize: pageSize,
      });
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
      const response = await axios.post<{ results: Document[]; total: number }>('/api/search', {
        page: currentPage,
        pageSize: pageSize,
      });
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
      <FilterSidebar
        filters={filters}
        setFilters={setFilters}
        availableFilters={availableFilters}
        darkMode={darkMode}
      />

      <main className={`flex-1 flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="p-6 flex-1">
          <SearchBar
            value={filters.text_search}
            onChange={(e) => {
              setCurrentPage(1); // reset page when searching
              setFilters({ ...filters, text_search: e.target.value });
            }}
            darkMode={darkMode}
          />
          <div className={`mb-4 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Found {totalResults} result{totalResults !== 1 && 's'}
          </div>
          <ResultsList documents={searchResults} darkMode={darkMode} loading={loading} />
          <Pagination
            currentPage={currentPage}
            totalResults={totalResults}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </main>
    </div>
  );
}