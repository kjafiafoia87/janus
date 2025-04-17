import { useEffect, useState } from 'react';
import axios from 'axios';
import { Document, SearchFilters } from '../types/document';
interface UseSearchReturn {
  results: Document[];
  total: number;
  loading: boolean;
}

export function useSearchDocuments(filters: SearchFilters, page: number, pageSize: number): UseSearchReturn {
  const [results, setResults] = useState<Document[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isEmpty = Object.values(filters).every(val =>
      Array.isArray(val) ? val.length === 0 : val === ''
    );

    const payload = isEmpty ? { page, pageSize } : { ...filters, page, pageSize };

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.post<{ results: Document[]; total: number }>('/api/search', payload);
        setResults(res.data.results || []);
        setTotal(res.data.total || 0);
      } catch (err) {
        console.error('❌ Error searching documents:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters, page, pageSize]);

  return { results, total, loading };
}
