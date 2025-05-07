import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { useTheme } from '../contexts/ThemeContext';

const ChartExport = ({ chartRef, data, filename = 'chart' }) => {
  const { currentTheme } = useTheme();

  const exportToPNG = useCallback(() => {
    if (!chartRef.current) return;

    const svg = chartRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();

    canvas.width = svg.width.baseVal.value * 2; // 2x for better quality
    canvas.height = svg.height.baseVal.value * 2;

    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  }, [chartRef, filename]);

  const exportToSVG = useCallback(() => {
    if (!chartRef.current) return;

    const svg = chartRef.current;
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(svgBlob);
    link.download = `${filename}.svg`;
    link.click();
    URL.revokeObjectURL(link.href);
  }, [chartRef, filename]);

  const exportToCSV = useCallback(() => {
    if (!data || !data.length) return;

    const csvContent = d3.csvFormat(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }, [data, filename]);

  const exportToJSON = useCallback(() => {
    if (!data || !data.length) return;

    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  }, [data, filename]);

  return (
    <div className={`p-4 rounded-lg ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <h4 className={`text-sm font-semibold mb-4 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
        Export Chart
      </h4>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={exportToPNG}
          className={`flex items-center justify-center py-2 px-4 rounded-md transition-colors duration-200 ${currentTheme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          PNG
        </button>
        <button
          onClick={exportToSVG}
          className={`flex items-center justify-center py-2 px-4 rounded-md transition-colors duration-200 ${currentTheme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          SVG
        </button>
        <button
          onClick={exportToCSV}
          className={`flex items-center justify-center py-2 px-4 rounded-md transition-colors duration-200 ${currentTheme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          CSV
        </button>
        <button
          onClick={exportToJSON}
          className={`flex items-center justify-center py-2 px-4 rounded-md transition-colors duration-200 ${currentTheme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          JSON
        </button>
      </div>
    </div>
  );
};

ChartExport.propTypes = {
  chartRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  filename: PropTypes.string,
};

export default ChartExport;
