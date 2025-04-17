export interface Document {
  id: string;
  case_number: string;
  type: string;
  date: string;
  title: string;
  summary: string;
  file_text: string;
  relevantMarket: string[];
  company: string;
  companies: string[];
  language: 'en' | 'fr';
  keywords?: string[];
  locations?: string[];
  people?: string[];
  pdfUrl?: string;
  sourceUrl?: string;
  jurisdiction?: string;
  authority?: string;
  sector?: string;
  label_codes: string[];
  label_titles: string[];
  status?: string;
}

export interface SearchFilters {
  case_number: string;
  title: string;
  companies: string[];
  language: string;
  text_search: string;
  date_from: string;
  date_to: string;
  label_codes: string[];
  label_titles: string[];
  sort_by: 'date' | 'relevance';
}

export interface SearchResults {
  documents: Document[];
  total: number;
  highlights: Record<string, string[]>;
}