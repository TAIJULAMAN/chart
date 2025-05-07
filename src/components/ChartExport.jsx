import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ChartExport = ({ onExport }) => {
  const { currentTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleExport = (format) => {
    onExport(format);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg transition-colors duration-200 ${
          currentTheme === 'dark'
            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        aria-label="Export chart"
      >
        📥 Export
      </button>
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 py-2 w-48 rounded-lg shadow-xl z-10 ${
            currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <button
            onClick={() => handleExport('png')}
            className={`block w-full text-left px-4 py-2 text-sm ${
              currentTheme === 'dark'
                ? 'text-gray-300 hover:bg-gray-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Export as PNG
          </button>
          <button
            onClick={() => handleExport('svg')}
            className={`block w-full text-left px-4 py-2 text-sm ${
              currentTheme === 'dark'
                ? 'text-gray-300 hover:bg-gray-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Export as SVG
          </button>
          <button
            onClick={() => handleExport('csv')}
            className={`block w-full text-left px-4 py-2 text-sm ${
              currentTheme === 'dark'
                ? 'text-gray-300 hover:bg-gray-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Export Data as CSV
          </button>
        </div>
      )}
    </div>
  );
};

export default ChartExport;
