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
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
         Chart
        </h1>
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
      </div>
    </div>
  );
}

export default App;
