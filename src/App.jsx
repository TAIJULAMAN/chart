import React from 'react';
import "./App.css";
import ResponsiveContainer from './components/ResponsiveContainer';
import LineChart from './components/LineChart';

const sampleData = [
  { x: 0, y: 10 },
  { x: 1, y: 15 },
  { x: 2, y: 35 },
  { x: 3, y: 20 },
  { x: 4, y: 45 },
  { x: 5, y: 30 },
  { x: 6, y: 50 },
];

function App() {
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

      {/* Example Chart */}
      <section id="examples" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Live Example</h3>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="h-[400px]">
              <ResponsiveContainer>
                {({ width, height }) => (
                  <LineChart
                    data={sampleData}
                    width={width}
                    height={height}
                    xKey="x"
                    yKey="y"
                    stroke="#2563eb"
                  />
                )}
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center text-sm text-gray-600">
              Interactive Line Chart Example
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Preview */}
      <section id="docs" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Quick Start</h3>
          <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
            <pre className="text-gray-300">
              <code>{`npm install chartmaster

import { LineChart, ResponsiveContainer } from 'chartmaster';

function App() {
  return (
    <ResponsiveContainer>
      {({ width, height }) => (
        <LineChart
          data={data}
          width={width}
          height={height}
          xKey="x"
          yKey="y"
        />
      )}
    </ResponsiveContainer>
  );
}`}</code>
            </pre>
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
