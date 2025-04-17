export interface Document {
  case_number: string;
  title: string;
  companies: string[];
  language: string;
  file_text: string;
  decision_date: string;
  label_codes: string[];
  label_titles: string[];
  link: string;
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
}

export interface FilterOptions {
  languages: string[];
  companies: string[];
  label_codes: string[];
  label_titles: string[];
  case_numbers: string[];
}
