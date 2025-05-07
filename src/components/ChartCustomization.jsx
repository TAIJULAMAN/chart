import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ChartCustomization = ({ config, onConfigChange }) => {
  const { currentTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('style');

  const tabs = [
    { id: 'style', label: 'Style' },
    { id: 'axes', label: 'Axes' },
    { id: 'animation', label: 'Animation' },
    { id: 'interaction', label: 'Interaction' }
  ];

  const ColorPicker = ({ label, value, onChange }) => (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${
        currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {label}
      </span>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 rounded cursor-pointer"
      />
    </div>
  );

  const RangeInput = ({ label, value, onChange, min, max, step }) => (
    <div className="space-y-1">
      <div className="flex justify-between">
        <span className={`text-sm ${
          currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {label}
        </span>
        <span className={`text-sm ${
          currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
      />
    </div>
  );

  const Switch = ({ label, checked, onChange }) => (
    <label className="flex items-center justify-between cursor-pointer">
      <span className={`text-sm ${
        currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {label}
      </span>
      <div className={`relative w-10 h-5 transition-colors duration-200 ease-in-out rounded-full ${
        checked
          ? 'bg-blue-600'
          : currentTheme === 'dark'
          ? 'bg-gray-600'
          : 'bg-gray-200'
      }`}>
        <div className={`absolute left-0 w-5 h-5 transition-transform duration-200 ease-in-out transform ${
          checked ? 'translate-x-5' : 'translate-x-0'
        } bg-white rounded-full shadow`} />
      </div>
    </label>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'style':
        return (
          <div className="space-y-4">
            <ColorPicker
              label="Series Color"
              value={config.style.seriesColor}
              onChange={(value) => onConfigChange('style.seriesColor', value)}
            />
            <ColorPicker
              label="Grid Color"
              value={config.style.gridColor}
              onChange={(value) => onConfigChange('style.gridColor', value)}
            />
            <RangeInput
              label="Stroke Width"
              value={config.style.strokeWidth}
              onChange={(value) => onConfigChange('style.strokeWidth', value)}
              min={1}
              max={5}
              step={0.5}
            />
            <RangeInput
              label="Opacity"
              value={config.style.opacity}
              onChange={(value) => onConfigChange('style.opacity', value)}
              min={0}
              max={1}
              step={0.1}
            />
          </div>
        );

      case 'axes':
        return (
          <div className="space-y-4">
            <Switch
              label="Show Grid"
              checked={config.axes.showGrid}
              onChange={(checked) => onConfigChange('axes.showGrid', checked)}
            />
            <Switch
              label="Show Axis Labels"
              checked={config.axes.showLabels}
              onChange={(checked) => onConfigChange('axes.showLabels', checked)}
            />
            <RangeInput
              label="Tick Size"
              value={config.axes.tickSize}
              onChange={(value) => onConfigChange('axes.tickSize', value)}
              min={0}
              max={10}
              step={1}
            />
          </div>
        );

      case 'animation':
        return (
          <div className="space-y-4">
            <Switch
              label="Enable Animations"
              checked={config.animation.enabled}
              onChange={(checked) => onConfigChange('animation.enabled', checked)}
            />
            <RangeInput
              label="Duration (ms)"
              value={config.animation.duration}
              onChange={(value) => onConfigChange('animation.duration', value)}
              min={0}
              max={2000}
              step={100}
            />
          </div>
        );

      case 'interaction':
        return (
          <div className="space-y-4">
            <Switch
              label="Enable Zoom"
              checked={config.interaction.zoomEnabled}
              onChange={(checked) => onConfigChange('interaction.zoomEnabled', checked)}
            />
            <Switch
              label="Enable Pan"
              checked={config.interaction.panEnabled}
              onChange={(checked) => onConfigChange('interaction.panEnabled', checked)}
            />
            <Switch
              label="Show Tooltip"
              checked={config.interaction.showTooltip}
              onChange={(checked) => onConfigChange('interaction.showTooltip', checked)}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`p-4 rounded-lg ${
      currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="flex space-x-2 mb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
              activeTab === tab.id
                ? currentTheme === 'dark'
                  ? 'bg-gray-700 text-gray-200'
                  : 'bg-gray-200 text-gray-900'
                : currentTheme === 'dark'
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ChartCustomization;
