import React, { useEffect } from 'react';
import {
  FileText,
  Download,
  BookOpen,
  Tag,
  Globe2,
  Building2,
  MapPin,
  User,
  Archive,
  X
} from 'lucide-react';
import { Document } from './types';

interface Props {
  doc: Document;
  onClose: () => void;
  darkMode: boolean;
}

export default function DocumentModal({ doc, onClose, darkMode }: Props) {
  const handleViewPDF = () => {
    if (doc.link) window.open(doc.link, '_blank');
  };

  const handleDownloadPDF = () => {
    if (doc.link) {
      const link = document.createElement('a');
      link.href = doc.link;
      link.download = doc.title || 'document';
      link.click();
    }
  };

  const handleArchive = () => {
    console.log('📦 Archive logic here for', doc.case_number);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 overflow-y-auto z-50">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className={`absolute inset-0 ${darkMode ? 'bg-gray-900' : 'bg-gray-500'} opacity-75`} />
        </div>

        <div
          className={`inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} px-6 pt-5 pb-6`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <FileText className={`h-5 w-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                  <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Merger Case</h3>
                  <span className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{doc.decision_date}</span>
                </div>
                <h2 className={`text-xl font-semibold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{doc.title}</h2>
              </div>

              <div className="flex items-center space-x-2">
                {doc.link && (
                  <>
                    <button
                      onClick={handleViewPDF}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <BookOpen className="h-4 w-4 mr-2" /> View PDF
                    </button>

                    <button
                      onClick={handleDownloadPDF}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Download className="h-4 w-4 mr-2" /> Download
                    </button>
                  </>
                )}

                <button
                  onClick={handleArchive}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Archive className="h-4 w-4 mr-2" /> Archive
                </button>

                <button
                  onClick={onClose}
                  title="Close modal"
                  className={`rounded-md p-2 ${
                    darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-500'
                  }`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Document Content */}
            <div className={`border-t border-b py-4 my-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h4 className={`text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Document Content</h4>
              <p className={`text-sm whitespace-pre-line ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {doc.file_text.slice(0, 1000)}{doc.file_text.length > 1000 ? '...' : ''}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className={`text-sm font-medium mb-2 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <Tag className="h-4 w-4 mr-2" /> Label Codes
                </h4>
                <div className="flex flex-wrap gap-2">
                  {doc.label_codes.map((code, idx) => (
                    <span
                      key={idx}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {code}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className={`text-sm font-medium mb-2 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <Tag className="h-4 w-4 mr-2" /> Label Titles
                </h4>
                <div className="flex flex-wrap gap-2">
                  {doc.label_titles.map((title, idx) => (
                    <span
                      key={idx}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {title}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className={`text-sm font-medium mb-2 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <Building2 className="h-4 w-4 mr-2" /> Companies Mentioned
                </h4>
                <div className="flex flex-wrap gap-2">
                  {doc.companies.map((company, idx) => (
                    <span
                      key={idx}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className={`text-sm font-medium mb-2 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <MapPin className="h-4 w-4 mr-2" /> Geographic Locations
                </h4>
                <div className="text-sm text-gray-400 italic">None</div>
              </div>

              <div>
                <h4 className={`text-sm font-medium mb-2 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <User className="h-4 w-4 mr-2" /> People Mentioned
                </h4>
                <div className="text-sm text-gray-400 italic">None</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
