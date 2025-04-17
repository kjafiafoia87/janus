import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { format, isWithinInterval, parse } from 'date-fns';
import type { Document, SearchFilters, SearchResults } from '../types/document';

const fuseOptions = {
  keys: ['title', 'file_text', 'case_number'],
  includeMatches: true,
  threshold: 0.3,
};

export function useSearch(documents: Document[]) {
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
    sort_by: 'date',
  });

  const fuse = useMemo(() => new Fuse(documents, fuseOptions), [documents]);

  const searchResults = useMemo<SearchResults>(() => {
    let results = [...documents];
    const highlights: Record<string, string[]> = {};

    // Full-text search
    if (filters.text_search) {
      const fuseResults = fuse.search(filters.text_search);
      results = fuseResults.map(({ item, matches }) => {
        // Store highlights for matched content
        highlights[item.id] = matches?.map(match => match.value || '') || [];
        return item;
      });
    }

    // Filter by case number
    if (filters.case_number) {
      results = results.filter(doc => 
        doc.case_number.toLowerCase().includes(filters.case_number.toLowerCase())
      );
    }

    // Filter by companies
    if (filters.companies.length > 0) {
      results = results.filter(doc =>
        filters.companies.every(company =>
          doc.companies.some(c => c.toLowerCase() === company.toLowerCase())
        )
      );
    }

    // Filter by language
    if (filters.language) {
      results = results.filter(doc => doc.language === filters.language);
    }

    // Filter by date range
    if (filters.date_from || filters.date_to) {
      results = results.filter(doc => {
        const docDate = parse(doc.date, 'yyyy-MM-dd', new Date());
        const start = filters.date_from ? parse(filters.date_from, 'yyyy-MM-dd', new Date()) : new Date(0);
        const end = filters.date_to ? parse(filters.date_to, 'yyyy-MM-dd', new Date()) : new Date();
        
        return isWithinInterval(docDate, { start, end });
      });
    }

    // Filter by label codes
    if (filters.label_codes.length > 0) {
      results = results.filter(doc =>
        filters.label_codes.every(code =>
          doc.label_codes.includes(code)
        )
      );
    }

    // Filter by label titles
    if (filters.label_titles.length > 0) {
      results = results.filter(doc =>
        filters.label_titles.every(title =>
          doc.label_titles.includes(title)
        )
      );
    }

    // Sort results
    if (filters.sort_by === 'date') {
      results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    // For relevance sorting, we keep the order from Fuse.js results

    return {
      documents: results,
      total: results.length,
      highlights,
    };
  }, [documents, filters, fuse]);

  return {
    filters,
    setFilters,
    results: searchResults,
  };
}