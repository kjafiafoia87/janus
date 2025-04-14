import React from 'react';
import { Document } from './types';
import DocumentCard from './DocumentCard';

interface Props {
  documents: Document[];
  darkMode: boolean;
  loading: boolean;
  onSelectDocument: (doc: Document) => void;
}

export function ResultsList({ documents, darkMode, loading, onSelectDocument }: Props) {
  if (loading) {
    return (
      <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {documents.map((doc, index) => (
        <DocumentCard
          key={`${doc.case_number}-${index}`}
          doc={doc}
          darkMode={darkMode}
          onClick={() => onSelectDocument(doc)}
        />
      ))}
    </div>
  );
}