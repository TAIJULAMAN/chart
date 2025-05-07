import React, { useState } from 'react';
import "./App.css";
import ResponsiveContainer from './components/ResponsiveContainer';
import LineChart from './components/LineChart';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import Tooltip from './components/Tooltip';

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

function App() {
  const [hoveredData, setHoveredData] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setTooltipPos({
      x: event.clientX,
      y: event.clientY,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-blue-600">ChartMaster</h1>
            <nav className="space-x-6">
              <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
              <a href="#examples" className="text-gray-600 hover:text-blue-600">Examples</a>
              <a href="#docs" className="text-gray-600 hover:text-blue-600">Documentation</a>
              <a href="https://github.com/TAIJULAMAN/chart" className="text-gray-600 hover:text-blue-600">GitHub</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Beautiful Charts Made <span className="text-blue-600">Simple</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            A powerful, flexible, and easy-to-use charting library built with React and D3.js
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Responsive', desc: 'Charts that automatically adapt to any screen size' },
              { title: 'Customizable', desc: 'Extensive styling options and theming support' },
              { title: 'Interactive', desc: 'Rich interactions with tooltips and animations' },
              { title: 'Multiple Chart Types', desc: 'Line, Bar, Area, Pie charts and more' },
              { title: 'React-Based', desc: 'Built with modern React patterns and hooks' },
              { title: 'Lightweight', desc: 'Optimized bundle size for better performance' },
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Examples */}
      <section id="examples" className="py-16 px-4 sm:px-6 lg:px-8" onMouseMove={handleMouseMove}>
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Interactive Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Line Chart */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="text-lg font-semibold mb-4">Line Chart</h4>
              <div className="h-[300px]">
                <ResponsiveContainer>
                  {({ width, height }) => (
                    <LineChart
                      data={lineData}
                      width={width}
                      height={height}
                      xKey="x"
                      yKey="y"
                      stroke="#2563eb"
                    />
                  )}
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Smooth transitions and responsive design
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="text-lg font-semibold mb-4">Bar Chart</h4>
              <div className="h-[300px]">
                <ResponsiveContainer>
                  {({ width, height }) => (
                    <BarChart
                      data={barData}
                      width={width}
                      height={height}
                      xKey="category"
                      yKey="value"
                      fill="#3b82f6"
                      onBarHover={setHoveredData}
                    />
                  )}
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Interactive bars with hover effects
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="text-lg font-semibold mb-4">Pie Chart</h4>
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
                    />
                  )}
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Dynamic pie slices with labels
              </div>
            </div>

            {/* Chart Customization */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="text-lg font-semibold mb-4">Customization</h4>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  All charts support extensive customization options:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                  <li>Custom colors and themes</li>
                  <li>Adjustable margins and padding</li>
                  <li>Configurable animations</li>
                  <li>Custom tooltips and legends</li>
                  <li>Responsive sizing</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tooltip */}
          <Tooltip
            content={
              hoveredData && (
                <div>
                  {hoveredData.category || hoveredData.label}: 
                  {hoveredData.value || hoveredData.y}
                </div>
              )
            }
            x={tooltipPos.x}
            y={tooltipPos.y}
          />
        </div>
      </section>

      {/* Enhanced Documentation */}
      <section id="docs" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Documentation</h3>
          
          {/* Quick Start */}
          <div className="mb-12">
            <h4 className="text-xl font-semibold mb-4">Quick Start</h4>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto mb-4">
              <pre className="text-gray-300">
                <code>{`npm install chartmaster

import { LineChart, BarChart, PieChart, ResponsiveContainer } from 'chartmaster';

function App() {
  const [hoveredData, setHoveredData] = useState(null);

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
}`}</code>
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
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">ChartMaster</h4>
            <p className="text-gray-400">Beautiful, responsive charts for modern web applications</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Links</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-blue-400">Features</a></li>
              <li><a href="#examples" className="hover:text-blue-400">Examples</a></li>
              <li><a href="#docs" className="hover:text-blue-400">Documentation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="https://github.com/TAIJULAMAN/chart" className="hover:text-blue-400">GitHub</a></li>
              <li><a href="#" className="hover:text-blue-400">Twitter</a></li>
              <li><a href="#" className="hover:text-blue-400">Discord</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
