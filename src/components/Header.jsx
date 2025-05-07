import React from 'react';

const Header = ({ currentTheme, toggleTheme }) => {
  return (
    <header className={`${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm sticky top-0 z-50 transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className={`text-3xl font-bold ${currentTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
            ChartMaster
          </h1>
          <div className="flex items-center space-x-6">
            <nav className="space-x-6">
              <a
                href="#features"
                className={`${currentTheme === 'dark' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Features
              </a>
              <a
                href="#examples"
                className={`${currentTheme === 'dark' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Examples
              </a>
              <a
                href="#docs"
                className={`${currentTheme === 'dark' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Documentation
              </a>
              <a
                href="https://github.com/TAIJULAMAN/chart"
                target="_blank"
                rel="noopener noreferrer"
                className={`${currentTheme === 'dark' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}
              >
                GitHub
              </a>
            </nav>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-200 ${currentTheme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              aria-label={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {currentTheme === 'dark' ? '🌞' : '🌙'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
