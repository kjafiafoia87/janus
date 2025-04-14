import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SearchBar } from './Concuria/SearchBar';
import { ResultsList } from './Concuria/ResultsList';
import { FilterSidebar } from './Concuria/FilterSidebar';
import { Pagination } from './Concuria/Pagination';
import { FilterOptions, SearchFilters } from './Concuria/types';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchDocuments } from '@/hooks/useSearchDocuments';

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

  const [page, setPage] = useState(1);
  const pageSize = 20;
  const debouncedFilters = useDebounce(filters, 500);
  const { results, total, loading } = useSearchDocuments(debouncedFilters, page, pageSize);

  useEffect(() => {
    axios.get<FilterOptions>('/api/filters')
      .then(res => setAvailableFilters(res.data))
      .catch(err => console.error('❌ Error fetching filters:', err));
  }, []);

  return (
    <div className="flex h-screen">
      <FilterSidebar
        filters={filters}
        setFilters={(newFilters) => {
          setPage(1);
          setFilters(newFilters);
        }}
        availableFilters={availableFilters}
        darkMode={darkMode}
      />
      <main className={`flex-1 flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="p-6 flex-1">
          <SearchBar
            value={filters.text_search}
            onChange={(e) => {
              setPage(1);
              setFilters({ ...filters, text_search: e.target.value });
            }}
            darkMode={darkMode}
          />
          <div className={`mb-4 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Found {total} result{total !== 1 && 's'}
          </div>
          <ResultsList documents={results} darkMode={darkMode} loading={loading} />
          <Pagination
            currentPage={page}
            totalResults={total}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        </div>
      </main>
    </div>
  );
}