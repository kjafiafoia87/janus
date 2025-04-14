import React from 'react';
import { Document } from './types';

export function DocumentCard({ doc, darkMode }: { doc: Document, darkMode: boolean }) {
  return (
    <div
      className={`p-4 rounded border shadow-sm ${
        darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-200'
      }`}
    >
      <h2 className="text-lg font-semibold">{doc.title}</h2>
      <p className="text-sm">
        {doc.case_number} — {doc.decision_date}
      </p>
      <div className="flex flex-wrap gap-2 mt-2">
        {doc.companies?.map((company) => (
          <span
            key={company}
            className={`text-xs px-2 py-1 rounded-full ${
              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
            }`}
          >
            {company}
          </span>
        ))}
      </div>
    </div>
  );
}