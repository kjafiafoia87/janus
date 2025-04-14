import React from 'react';
import { Document } from './types';
import { Globe2, Tag } from 'lucide-react';

interface Props {
  doc: Document;
  darkMode: boolean;
  onClick: () => void;
}

export default function DocumentCard({ doc, darkMode, onClick }: Props) {
  const labelBase = 'inline-flex items-center text-xs px-2 py-1 rounded-full border font-medium';

  const theme = darkMode
    ? {
        card: 'bg-gray-800 text-white border-gray-600',
        badge: 'bg-indigo-700 text-white border-indigo-500',
        code: 'bg-purple-700 text-white border-purple-500',
        company: 'bg-green-700 text-white border-green-500',
        meta: 'text-gray-400',
      }
    : {
        card: 'bg-white text-gray-900 border-gray-200',
        badge: 'bg-indigo-100 text-indigo-800 border-indigo-300',
        code: 'bg-purple-100 text-purple-800 border-purple-300',
        company: 'bg-green-100 text-green-800 border-green-300',
        meta: 'text-gray-500',
      };

  return (
    <div
      onClick={onClick}
      className={`p-6 rounded border shadow-sm cursor-pointer space-y-4 flex flex-col transition hover:shadow-md ${theme.card}`}
    >
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">{doc.title}</h2>
        <p className={`text-sm ${theme.meta}`}>
          {doc.case_number} — {doc.decision_date}
        </p>
      </div>

      {/* Label Codes */}
      {doc.label_codes?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {doc.label_codes.map((code, idx) => (
            <span key={`code-${idx}`} className={`${labelBase} ${theme.code}`}>
              #{code}
            </span>
          ))}
        </div>
      )}

      {/* Label Titles */}
      {doc.label_titles?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {doc.label_titles.map((title, idx) => (
            <span key={`title-${idx}`} className={`${labelBase} ${theme.badge}`}>
              <Tag className="w-3 h-3 mr-1" />
              {title}
            </span>
          ))}
        </div>
      )}

      {/* Footer : Companies + Language */}
      <div className="flex justify-between items-center mt-2 flex-wrap gap-2">
        {/* Companies */}
        {doc.companies?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {doc.companies.map((company, idx) => (
              <span key={`company-${idx}`} className={`${labelBase} ${theme.company}`}>
                {company}
              </span>
            ))}
          </div>
        )}

        {/* Language */}
        {doc.language && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${theme.meta}`}>
            <Globe2 className="w-4 h-4" />
            {doc.language.toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
}