import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ChartLegend = ({ items, activeItems, onToggle }) => {
  const { currentTheme } = useTheme();

  return (
    <div className={`p-4 rounded-lg ${
      currentTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
    }`}>
      <h4 className={`text-sm font-semibold mb-2 ${
        currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
      }`}>
        Legend
      </h4>
      <div className="space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onToggle(item.id)}
            className={`flex items-center space-x-2 w-full p-2 rounded transition-colors duration-200 ${
              activeItems.includes(item.id)
                ? currentTheme === 'dark'
                  ? 'bg-gray-700 text-gray-300'
                  : 'bg-white text-gray-900'
                : currentTheme === 'dark'
                ? 'bg-gray-800 text-gray-500'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChartLegend;
