import React from 'react';

interface SearchHighlightProps {
  text: string;
  searchTerm: string;
  className?: string;
}

export const SearchHighlight: React.FC<SearchHighlightProps> = ({ text, searchTerm, className = '' }) => {
  if (!searchTerm) return <span className={className}>{text}</span>;

  const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));

  return (
    <span className={className}>
      {parts.map((part, i) => (
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <mark key={i} className="bg-yellow-200 dark:bg-yellow-900">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      ))}
    </span>
  );
};

export default SearchHighlight;