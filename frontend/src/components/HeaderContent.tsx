import React from 'react';
import { Scale, Archive } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

interface HeaderContentProps {
  darkMode: boolean;
}

const HeaderContent: React.FC<HeaderContentProps> = ({ darkMode }) => {
  const location = useLocation();
  const currentTool = location.pathname === '/concuria' ? 'Concuria' : '';

  return (
    <div className="flex items-center justify-between w-full">
      <Link to="/" className="flex items-center group transition-transform duration-200 hover:scale-105">
        <Scale className={`h-8 w-8 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
        <span className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Janus 
          {currentTool && (
            <span className="inline-flex items-center">
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-sm text-gray-400">{currentTool}</span>
            </span>
          )}
        </span>
      </Link>
      <Link
        to="/archives"
        className={`flex items-center p-2 rounded-md text-sm font-medium transition-colors ${
          darkMode
            ? 'text-gray-300 hover:text-white hover:bg-gray-700'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
      >
        <Archive className="h-4 w-4" />
      </Link>
    </div>
  );
};

export default HeaderContent;