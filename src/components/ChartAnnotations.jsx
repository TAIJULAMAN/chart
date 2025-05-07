import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ChartAnnotations = ({ onAddAnnotation, annotations, onRemoveAnnotation }) => {
  const { currentTheme } = useTheme();
  const [isAdding, setIsAdding] = useState(false);
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim()) {
      onAddAnnotation({
        id: Date.now(),
        text: text.trim(),
        position: { x: 0, y: 0 } // Default position, will be updated on click
      });
      setText('');
      setIsAdding(false);
    }
  };

  return (
    <div className={`p-4 rounded-lg ${
      currentTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
    }`}>
      <div className="flex justify-between items-center mb-4">
        <h4 className={`text-sm font-semibold ${
          currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Annotations
        </h4>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className={`p-2 rounded transition-colors duration-200 ${
            currentTheme === 'dark'
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-white text-gray-600 hover:bg-gray-200'
          }`}
        >
          {isAdding ? '✕' : '✎ Add'}
        </button>
      </div>

      {isAdding && (
        <div className="mb-4 space-y-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter annotation text..."
            className={`w-full p-2 rounded ${
              currentTheme === 'dark'
                ? 'bg-gray-700 text-gray-300 placeholder-gray-500'
                : 'bg-white text-gray-900 placeholder-gray-400'
            }`}
          />
          <button
            onClick={handleAdd}
            className={`w-full p-2 rounded transition-colors duration-200 ${
              currentTheme === 'dark'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Add Annotation
          </button>
        </div>
      )}

      <div className="space-y-2">
        {annotations.map((annotation) => (
          <div
            key={annotation.id}
            className={`flex justify-between items-center p-2 rounded ${
              currentTheme === 'dark'
                ? 'bg-gray-700 text-gray-300'
                : 'bg-white text-gray-900'
            }`}
          >
            <span className="text-sm">{annotation.text}</span>
            <button
              onClick={() => onRemoveAnnotation(annotation.id)}
              className={`p-1 rounded transition-colors duration-200 ${
                currentTheme === 'dark'
                  ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartAnnotations;
