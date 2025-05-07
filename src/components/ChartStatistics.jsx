import React, { useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ChartStatistics = ({ data, valueKey }) => {
  const { currentTheme } = useTheme();

  const stats = useMemo(() => {
    const values = data.map(item => Number(item[valueKey])).filter(val => !isNaN(val));
    
    const sum = values.reduce((acc, val) => acc + val, 0);
    const mean = sum / values.length;
    const sortedValues = [...values].sort((a, b) => a - b);
    const median = sortedValues[Math.floor(sortedValues.length / 2)];
    
    const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
    const stdDev = Math.sqrt(variance);
    
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    return {
      count: values.length,
      sum: sum.toFixed(2),
      mean: mean.toFixed(2),
      median: median.toFixed(2),
      stdDev: stdDev.toFixed(2),
      min: min.toFixed(2),
      max: max.toFixed(2),
    };
  }, [data, valueKey]);

  const StatItem = ({ label, value }) => (
    <div className="flex justify-between items-center py-2">
      <span className={`text-sm ${
        currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {label}:
      </span>
      <span className={`font-medium ${
        currentTheme === 'dark' ? 'text-gray-200' : 'text-gray-900'
      }`}>
        {value}
      </span>
    </div>
  );

  return (
    <div className={`p-4 rounded-lg ${
      currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'
    }`}>
      <h4 className={`text-sm font-semibold mb-4 ${
        currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-900'
      }`}>
        Statistics
      </h4>
      <div className="space-y-1">
        <StatItem label="Count" value={stats.count} />
        <StatItem label="Sum" value={stats.sum} />
        <StatItem label="Mean" value={stats.mean} />
        <StatItem label="Median" value={stats.median} />
        <StatItem label="Std Dev" value={stats.stdDev} />
        <StatItem label="Min" value={stats.min} />
        <StatItem label="Max" value={stats.max} />
      </div>
    </div>
  );
};

export default ChartStatistics;
