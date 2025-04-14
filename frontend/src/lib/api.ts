// src/lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
});

// If you're using POST for document search, use this:
interface SearchDocumentsParams {
  case_number?: string;
  title?: string;
  companies?: string[];
  language?: string;
  text_search?: string;
  date_from?: string;
  date_to?: string;
  label_codes?: string[];
  label_titles?: string[];
  page?: number;
  pageSize?: number;
}

export const searchDocuments = async (params: SearchDocumentsParams = {}) => {
  const response = await api.post('/search', params);
  return response.data;
};

// Optional: Get available filters
export const fetchFilters = async () => {
  const response = await api.get('/filters');
  return response.data;
};

export default api;