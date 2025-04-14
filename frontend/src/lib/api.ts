import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  timeout: 10000,
});

interface GetDocumentsParams {
  q?: string;
  page?: number;
  pageSize?: number;
  date_from?: string;
  date_to?: string;
  companies?: string[];
  file_text?: string;
}

export const getDocuments = async (params: GetDocumentsParams = {}) => {
  let url = '/concuria?';
  for (const key in params) {
    // Narrow down key to keyof GetDocumentsParams
    const typedKey = key as keyof GetDocumentsParams; 
    if (params[typedKey] !== undefined && params[typedKey] !== null && params[typedKey] !== '') {
      if (Array.isArray(params[typedKey])) {
        url += `${key}=${params[typedKey].join(',')}&`;
      } else {
        url += `${key}=${params[typedKey]}&`;
      }
    }
  }
  const response = await api.get(url);
  return response.data;
};
export default api;
