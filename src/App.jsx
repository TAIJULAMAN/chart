import React, { useState, useCallback, Suspense, lazy } from 'react';
import "./App.css";
import ResponsiveContainer from './components/ResponsiveContainer';
import LoadingSpinner from './components/LoadingSpinner';
import ChartWrapper from './components/ChartWrapper';
import ErrorBoundary from './components/ErrorBoundary';
import Tooltip from './components/Tooltip';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Features from './components/Features';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';

// Lazy load chart components
const LineChart = lazy(() => import('./components/LineChart'));
const BarChart = lazy(() => import('./components/BarChart'));
const PieChart = lazy(() => import('./components/PieChart'));
const AreaChart = lazy(() => import('./components/AreaChart'));
const ScatterPlot = lazy(() => import('./components/ScatterPlot'));

const lineData = [
  { x: 0, y: 10 },
  { x: 1, y: 15 },
  { x: 2, y: 35 },
  { x: 3, y: 20 },
  { x: 4, y: 45 },
  { x: 5, y: 30 },
  { x: 6, y: 50 },
];

const barData = [
  { category: 'A', value: 30 },
  { category: 'B', value: 45 },
  { category: 'C', value: 60 },
  { category: 'D', value: 25 },
  { category: 'E', value: 80 },
];

const pieData = [
  { label: 'Category 1', value: 30 },
  { label: 'Category 2', value: 20 },
  { label: 'Category 3', value: 15 },
  { label: 'Category 4', value: 25 },
  { label: 'Category 5', value: 10 },
];

const scatterData = [
  { x: 10, y: 20, group: 'A' },
  { x: 15, y: 35, group: 'B' },
  { x: 25, y: 15, group: 'A' },
  { x: 35, y: 40, group: 'B' },
  { x: 45, y: 25, group: 'A' },
  { x: 55, y: 45, group: 'B' },
  { x: 65, y: 30, group: 'A' },
];

const areaData = [
  { x: 0, y: 20 },
  { x: 1, y: 35 },
  { x: 2, y: 25 },
  { x: 3, y: 45 },
  { x: 4, y: 30 },
  { x: 5, y: 55 },
  { x: 6, y: 40 },
];

const ChartApp = () => {
  const { theme, currentTheme, toggleTheme } = useTheme();
  const [hoveredData, setHoveredData] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState({ scale: 1, x: 0, y: 0 });

  const handleMouseMove = useCallback((event) => {
    setTooltipPos({
      x: event.clientX,
      y: event.clientY,
    });
  }, []);

  const handleWheel = useCallback((event) => {
    if (event.ctrlKey) {
      event.preventDefault();
      const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1;
      setZoom(prev => ({
        ...prev,
        scale: Math.max(0.5, Math.min(3, prev.scale * scaleFactor)),
      }));
    }
  }, []);

  const handlePan = useCallback((event) => {
    if (event.buttons === 1) {
      setZoom(prev => ({
        ...prev,
        x: prev.x + event.movementX,
        y: prev.y + event.movementY,
      }));
    }
  }, []);

  return (
    <div
      className={`min-h-screen ${currentTheme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-b from-gray-50 to-gray-100'}`}
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
      onMouseDown={handlePan}
    >
      {/* Header */}
      <Header currentTheme={currentTheme} toggleTheme={toggleTheme} />

      {/* Hero Section */}
      <Hero />

      {/* Features Grid */}
      <Features />

      {/* Interactive Examples */}
      <section
        id="examples"
        className={`py-16 px-4 sm:px-6 lg:px-8 ${currentTheme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
      >
        <div className="max-w-7xl mx-auto">
          <h3 className={`text-2xl font-bold ${currentTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'} mb-8`}>Interactive Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Line Chart */}
            <ChartWrapper
              title="Line Chart"
              description="Interactive line chart with hover effects"
              theme={currentTheme}
            >
              <Suspense fallback={<LoadingSpinner />}>
                <div className="h-[300px]">
                  <ResponsiveContainer>
                    {({ width, height }) => (
                      <LineChart
                        data={lineData}
                        width={width}
                        height={height}
                        xKey="x"
                        yKey="y"
                        stroke={theme.colors.primary}
                        onPointHover={setHoveredData}
                        animate={true}
                      />
                    )}
                  </ResponsiveContainer>
                </div>
              </Suspense>
            </ChartWrapper>

            {/* Bar Chart */}
            <ChartWrapper
              title="Bar Chart"
              description="Interactive bar chart with hover effects"
              theme={currentTheme}
            >
              <Suspense fallback={<LoadingSpinner />}>
                <div className="h-[300px]">
                  <ResponsiveContainer>
                    {({ width, height }) => (
                      <BarChart
                        data={barData}
                        width={width}
                        height={height}
                        xKey="category"
                        yKey="value"
                        fill={theme.colors.primary}
                        onBarHover={setHoveredData}
                        animate={true}
                      />
                    )}
                  </ResponsiveContainer>
                </div>
              </Suspense>
            </ChartWrapper>

            {/* Pie Chart */}
            <ChartWrapper
              title="Pie Chart"
              description="Dynamic pie chart with labels"
              theme={currentTheme}
            >
              <Suspense fallback={<LoadingSpinner />}>
                <div className="h-[300px]">
                  <ResponsiveContainer>
                    {({ width, height }) => (
                      <PieChart
                        data={pieData}
                        width={width}
                        height={height}
                        valueKey="value"
                        labelKey="label"
                        onSliceHover={setHoveredData}
                        animate={true}
                      />
                    )}
                  </ResponsiveContainer>
                </div>
              </Suspense>
            </ChartWrapper>

            {/* Area Chart */}
            <ChartWrapper
              title="Area Chart"
              description="Smooth area chart with gradient fill"
              theme={currentTheme}
            >
              <Suspense fallback={<LoadingSpinner />}>
                <div className="h-[300px]">
                  <ResponsiveContainer>
                    {({ width, height }) => (
                      <AreaChart
                        data={areaData}
                        width={width}
                        height={height}
                        xKey="x"
                        yKey="y"
                        fill={theme.colors.primary}
                        stroke={theme.colors.primary}
                        onAreaHover={setHoveredData}
                        animate={true}
                      />
                    )}
                  </ResponsiveContainer>
                </div>
              </Suspense>
            </ChartWrapper>

            {/* Scatter Plot */}
            <ChartWrapper
              title="Scatter Plot"
              description="Interactive scatter plot with grouping"
              theme={currentTheme}
            >
              <Suspense fallback={<LoadingSpinner />}>
                <div className="h-[300px]">
                  <ResponsiveContainer>
                    {({ width, height }) => (
                      <ScatterPlot
                        data={scatterData}
                        width={width}
                        height={height}
                        xKey="x"
                        yKey="y"
                        groupKey="group"
                        colors={[theme.colors.primary, theme.colors.secondary]}
                        onPointHover={setHoveredData}
                        animate={true}
                      />
                    )}
                  </ResponsiveContainer>
                </div>
              </Suspense>
            </ChartWrapper>

            {/* Chart Customization */}
            <ChartWrapper
              title="Customization"
              description="All charts support extensive customization options"
              theme={currentTheme}
            >
              <div className="space-y-4">
                <ul className={`list-disc list-inside text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'} space-y-2`}>
                  <li>Custom colors and themes</li>
                  <li>Adjustable margins and padding</li>
                  <li>Configurable animations</li>
                  <li>Custom tooltips and legends</li>
                  <li>Responsive sizing</li>
                </ul>
              </div>
            </ChartWrapper>
          </div>

          {/* Tooltip */}
          <Tooltip
            show={hoveredData !== null}
            x={tooltipPos.x}
            y={tooltipPos.y}
            content={
              hoveredData && (
                <div>
                  {hoveredData.category || hoveredData.label}:
                  {hoveredData.value || hoveredData.y}
                </div>
              )
            }
          />
        </div>
      </section>

      {/* Enhanced Documentation */}
      <section id="docs" className={`py-16 px-4 sm:px-6 lg:px-8 ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <h3 className={`text-2xl font-bold ${currentTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'} mb-8`}>Documentation</h3>

          {/* Quick Start */}
          <div className="mb-12">
            <h4 className={`text-xl font-semibold mb-4 ${currentTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Quick Start</h4>
            <div className={`${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded-lg`}>
              <pre className={`text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {`npm install @chartmaster/core
// or
yarn add @chartmaster/core

import { LineChart, BarChart, PieChart, ResponsiveContainer } from '@chartmaster/core';

const Example = () => {
  return (
    <ResponsiveContainer>
      {({ width, height }) => (
        <LineChart
          data={data}
          width={width}
          height={height}
          xKey="x"
          yKey="y"
          onPointHover={setHoveredData}
        />
      )}
    </ResponsiveContainer>
  );
};`}
              </pre>
            </div>
          </div>

          {/* Component API */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LineChart API */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">LineChart Props</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-sm">
                  <li><code className="text-blue-600">data</code>: Array of data points</li>
                  <li><code className="text-blue-600">width</code>: Chart width</li>
                  <li><code className="text-blue-600">height</code>: Chart height</li>
                  <li><code className="text-blue-600">xKey</code>: Key for X-axis values</li>
                  <li><code className="text-blue-600">yKey</code>: Key for Y-axis values</li>
                  <li><code className="text-blue-600">stroke</code>: Line color</li>
                  <li><code className="text-blue-600">onPointHover</code>: Hover callback</li>
                </ul>
              </div>
            </div>

            {/* BarChart API */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">BarChart Props</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-sm">
                  <li><code className="text-blue-600">data</code>: Array of data points</li>
                  <li><code className="text-blue-600">width</code>: Chart width</li>
                  <li><code className="text-blue-600">height</code>: Chart height</li>
                  <li><code className="text-blue-600">xKey</code>: Category key</li>
                  <li><code className="text-blue-600">yKey</code>: Value key</li>
                  <li><code className="text-blue-600">fill</code>: Bar color</li>
                  <li><code className="text-blue-600">onBarHover</code>: Hover callback</li>
                </ul>
              </div>
            </div>

            {/* PieChart API */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">PieChart Props</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-sm">
                  <li><code className="text-blue-600">data</code>: Array of data points</li>
                  <li><code className="text-blue-600">width</code>: Chart width</li>
                  <li><code className="text-blue-600">height</code>: Chart height</li>
                  <li><code className="text-blue-600">valueKey</code>: Value key</li>
                  <li><code className="text-blue-600">labelKey</code>: Label key</li>
                  <li><code className="text-blue-600">colors</code>: Color array</li>
                  <li><code className="text-blue-600">onSliceHover</code>: Hover callback</li>
                </ul>
              </div>
            </div>

            {/* ResponsiveContainer API */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">ResponsiveContainer Props</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-sm">
                  <li><code className="text-blue-600">width</code>: Container width</li>
                  <li><code className="text-blue-600">height</code>: Container height</li>
                  <li><code className="text-blue-600">children</code>: Render prop function</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer currentTheme={currentTheme} />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <ChartApp />
    </ThemeProvider>
  );
};

export default App;