import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ChartComparison = ({ datasets, onCompare }) => {
  const { currentTheme } = useTheme();
  const [selectedDatasets, setSelectedDatasets] = useState([]);
  const [comparisonType, setComparisonType] = useState('overlay');

  const handleDatasetToggle = (datasetId) => {
    setSelectedDatasets(prev =>
      prev.includes(datasetId)
        ? prev.filter(id => id !== datasetId)
        : [...prev, datasetId]
    );
  };

  const handleCompare = () => {
    onCompare({
      datasets: selectedDatasets,
      type: comparisonType
    });
  };

  return (
    <div className={`p-4 rounded-lg ${
      currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'
    }`}>
      <h4 className={`text-sm font-semibold mb-4 ${
        currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-900'
      }`}>
        Compare Datasets
      </h4>

      <div className="space-y-4">
        <div className="space-y-2">
          {datasets.map(dataset => (
            <label
              key={dataset.id}
              className={`flex items-center space-x-2 cursor-pointer p-2 rounded ${
                currentTheme === 'dark'
                  ? 'hover:bg-gray-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedDatasets.includes(dataset.id)}
                onChange={() => handleDatasetToggle(dataset.id)}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className={
                currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }>
                {dataset.name}
              </span>
            </label>
          ))}
        </div>

        <div className="space-y-2">
          <label className={`block text-sm font-medium ${
            currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Comparison Type
          </label>
          <select
            value={comparisonType}
            onChange={(e) => setComparisonType(e.target.value)}
            className={`block w-full rounded-md py-2 px-3 ${
              currentTheme === 'dark'
                ? 'bg-gray-700 text-gray-300 border-gray-600'
                : 'bg-white text-gray-900 border-gray-300'
            }`}
          >
            <option value="overlay">Overlay</option>
            <option value="sideBySide">Side by Side</option>
            <option value="difference">Difference</option>
            <option value="percentage">Percentage Change</option>
          </select>
        </div>

        <button
          onClick={handleCompare}
          disabled={selectedDatasets.length < 2}
          className={`w-full py-2 px-4 rounded-md transition-colors duration-200 ${
            selectedDatasets.length < 2
              ? 'opacity-50 cursor-not-allowed'
              : currentTheme === 'dark'
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          Compare Selected Datasets
        </button>
      </div>

      {selectedDatasets.length < 2 && (
        <p className={`mt-2 text-sm ${
          currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Select at least 2 datasets to compare
        </p>
      )}
    </div>
  );
};

export default ChartComparison;
