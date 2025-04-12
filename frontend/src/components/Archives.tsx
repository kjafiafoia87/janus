import React from 'react';
import { ArrowLeft, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ArchivesProps {
  darkMode: boolean;
  archivedDocuments: Set<string>;
  onToggleArchive: (documentId: string) => void;
}

const Archives: React.FC<ArchivesProps> = ({ darkMode, archivedDocuments, onToggleArchive }) => {
  return (
    <div className={`flex-1 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-6">
          <Link
            to="/concuria"
            className={`mr-4 p-2 rounded-lg ${
              darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className={`text-2xl font-bold flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <Bookmark className="h-6 w-6 mr-2" />
            Archived Documents
          </h1>
        </div>

        <div className="grid gap-6">
          {Array.from(archivedDocuments).map((documentId) => (
            <div
              key={documentId}
              className={`${
                darkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              } rounded-lg shadow-sm border p-4`}
            >
              {/* Document content would be populated here */}
              <div className="flex justify-between items-center">
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Document ID: {documentId}
                </span>
                <button
                  onClick={() => onToggleArchive(documentId)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    darkMode
                      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Remove from Archives
                </button>
              </div>
            </div>
          ))}

          {archivedDocuments.size === 0 && (
            <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Bookmark className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No archived documents yet</p>
              <p className="mt-2">Documents you archive will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Archives;