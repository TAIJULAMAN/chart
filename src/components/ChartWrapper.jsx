import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from './ErrorBoundary';
import LoadingSpinner from './LoadingSpinner';
import ChartDataTable from './ChartDataTable';
import ChartStatistics from './ChartStatistics';
import ChartComparison from './ChartComparison';
import ChartCustomization from './ChartCustomization';
import ChartControls from './ChartControls';
import ChartExport from './ChartExport';
import { useTheme } from '../contexts/ThemeContext';

const ChartWrapper = ({ 
  title, 
  description, 
  children, 
  loading,
  data,
  columns = [],
  valueKey = 'value',
  datasets = [],
  onDataChange,
  onCompare,
  onExport
}) => {
  const { currentTheme } = useTheme();
  const [showDataTable, setShowDataTable] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);

  // Add back scale and pan state
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [annotations, setAnnotations] = useState([]);
  const [activeItems, setActiveItems] = useState([]);

  const handleZoomIn = useCallback(() => {
    setScale(prev => Math.min(prev * 1.2, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale(prev => Math.max(prev / 1.2, 0.5));
  }, []);

  const handleReset = useCallback(() => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const handlePan = useCallback((dx, dy) => {
    setPan(prev => ({
      x: prev.x + dx,
      y: prev.y + dy
    }));
  }, []);

  // Chart configuration state
  const [chartConfig, setChartConfig] = useState({
    style: {
      seriesColor: '#3B82F6',
      gridColor: '#E5E7EB',
      strokeWidth: 2,
      opacity: 0.8
    },
    axes: {
      showGrid: true,
      showLabels: true,
      tickSize: 5
    },
    animation: {
      enabled: true,
      duration: 1000
    },
    interaction: {
      zoomEnabled: true,
      panEnabled: true,
      showTooltip: true
    }
  });

  const handleConfigChange = useCallback((path, value) => {
    setChartConfig(prev => {
      const keys = path.split('.');
      const newConfig = { ...prev };
      let current = newConfig;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newConfig;
    });
  }, []);

  const handleLegendToggle = useCallback((itemId) => {
    setActiveItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  }, []);

  const handleAddAnnotation = useCallback((annotation) => {
    setAnnotations(prev => [...prev, annotation]);
  }, []);

  const handleRemoveAnnotation = useCallback((annotationId) => {
    setAnnotations(prev => prev.filter(a => a.id !== annotationId));
  }, []);

  const handleExport = useCallback((format) => {
    if (onExport) {
      onExport(format, {
        data,
        scale,
        pan,
        annotations,
        activeItems,
      });
    }
  }, [data, scale, pan, annotations, activeItems, onExport]);

  return (
    <div className={`p-6 rounded-lg shadow-lg ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={`text-lg font-semibold mb-2 ${currentTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
            {title}
          </h3>
          {description && (
            <p className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {description}
            </p>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowDataTable(!showDataTable)}
            className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
              showDataTable
                ? currentTheme === 'dark'
                  ? 'bg-gray-700 text-gray-200'
                  : 'bg-gray-200 text-gray-900'
                : currentTheme === 'dark'
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📊 Data
          </button>
          <button
            onClick={() => setShowStatistics(!showStatistics)}
            className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
              showStatistics
                ? currentTheme === 'dark'
                  ? 'bg-gray-700 text-gray-200'
                  : 'bg-gray-200 text-gray-900'
                : currentTheme === 'dark'
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📈 Stats
          </button>
          <button
            onClick={() => setShowComparison(!showComparison)}
            className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
              showComparison
                ? currentTheme === 'dark'
                  ? 'bg-gray-700 text-gray-200'
                  : 'bg-gray-200 text-gray-900'
                : currentTheme === 'dark'
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🔄 Compare
          </button>
          <button
            onClick={() => setShowCustomization(!showCustomization)}
            className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
              showCustomization
                ? currentTheme === 'dark'
                  ? 'bg-gray-700 text-gray-200'
                  : 'bg-gray-200 text-gray-900'
                : currentTheme === 'dark'
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            ⚙️ Customize
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <ErrorBoundary>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div 
                className="relative"
                style={{
                  transform: `scale(${scale}) translate(${pan.x}px, ${pan.y}px)`,
                  transformOrigin: 'center',
                  transition: 'transform 0.2s ease-out'
                }}
              >
                {children}
              </div>

              {showDataTable && (
                <div className="mt-4">
                  <ChartDataTable
                    data={data}
                    columns={columns}
                    onDataChange={onDataChange}
                  />
                </div>
              )}

              {showStatistics && (
                <div className="mt-4">
                  <ChartStatistics
                    data={data}
                    valueKey={valueKey}
                  />
                </div>
              )}

              {showComparison && (
                <div className="mt-4">
                  <ChartComparison
                    datasets={datasets}
                    onCompare={onCompare}
                  />
                </div>
              )}

              {showCustomization && (
                <div className="mt-4">
                  <ChartCustomization
                    config={chartConfig}
                    onConfigChange={handleConfigChange}
                  />
                </div>
              )}
            </>
          )}
        </ErrorBoundary>
      </div>
    </div>
  );
};

ChartWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  data: PropTypes.array,
  columns: PropTypes.arrayOf(PropTypes.string),
  valueKey: PropTypes.string,
  datasets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      data: PropTypes.array.isRequired,
    })
  ),
  onDataChange: PropTypes.func,
  onCompare: PropTypes.func,
};

ChartWrapper.defaultProps = {
  loading: false,
  data: [],
  columns: [],
  valueKey: 'value',
  datasets: [],
  onDataChange: () => {},
  onCompare: () => {},
};

export default ChartWrapper;
