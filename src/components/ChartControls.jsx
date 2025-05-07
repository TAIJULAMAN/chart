import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ChartControls = ({ onZoomIn, onZoomOut, onReset, onPan }) => {
  const { currentTheme } = useTheme();

  const buttonClass = `p-2 rounded-lg transition-colors duration-200 ${
    currentTheme === 'dark'
      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
  }`;

  return (
    <div className="flex space-x-2">
      <button
        onClick={onZoomIn}
        className={buttonClass}
        aria-label="Zoom in"
      >
        🔍+
      </button>
      <button
        onClick={onZoomOut}
        className={buttonClass}
        aria-label="Zoom out"
      >
        🔍-
      </button>
      <button
        onClick={onReset}
        className={buttonClass}
        aria-label="Reset view"
      >
        ↺
      </button>
      <div className="relative group">
        <button
          onClick={onPan}
          className={buttonClass}
          aria-label="Pan"
        >
          ✋
        </button>
        <div className={`absolute bottom-full mb-2 p-2 rounded-lg shadow-lg transition-opacity duration-200 opacity-0 group-hover:opacity-100 ${
          currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <p className={`text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Click and drag to pan
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChartControls;
