import React from 'react';
import { Document } from './types';
import { DocumentCard } from './DocumentCard';

export function ResultsList({
  documents,
  darkMode,
  loading
}: {
  documents: Document[];
  darkMode: boolean;
  loading: boolean;
}) {
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
        <DocumentCard key={`${doc.case_number}-${index}`} doc={doc} darkMode={darkMode} />
      ))}
    </div>
  );
}