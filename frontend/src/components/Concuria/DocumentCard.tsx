import React, { useState } from 'react';
import { Document } from './types';

export function DocumentCard({ doc, darkMode }: { doc: Document; darkMode: boolean }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="relative">
      <div
        className="p-4 rounded border shadow-sm bg-white text-gray-900 border-gray-200 cursor-pointer"
        onClick={handleClick}
      >
        <h2 className="text-lg font-semibold">{doc.title}</h2>
        <p className="text-sm">
          {doc.case_number} — {doc.decision_date}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {doc.companies?.map((company) => (
            <span key={company}>{company}</span>
          ))}
        </div>
      </div>

      {showPopup && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10"
          onClick={closePopup}
        >
          <div
            className="bg-white rounded p-4 w-3/4 max-h-96 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <pre>{doc.file_text}</pre>
          </div>
        </div>
      )}
    </div>
  );
}