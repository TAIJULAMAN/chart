import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from './ErrorBoundary';
import LoadingSpinner from './LoadingSpinner';

const ChartWrapper = ({ 
  title, 
  description, 
  children, 
  loading: externalLoading,
  className = '',
  theme = 'light'
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const isLoading = loading || externalLoading;

  return (
    <div className={`rounded-lg shadow-lg p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} ${className}`}>
      <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
        {title}
      </h4>
      <div className="h-[300px] relative">
        <ErrorBoundary>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            children
          )}
        </ErrorBoundary>
      </div>
      {description && (
        <div className={`mt-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          {description}
        </div>
      )}
    </div>
  );
};

ChartWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['light', 'dark']),
};

export default ChartWrapper;
