import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Hero = () => {
  const { currentTheme } = useTheme();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className={`text-4xl font-extrabold ${currentTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'} sm:text-5xl md:text-6xl`}>
          Beautiful Charts Made <span className="text-blue-600">Simple</span>
        </h2>
        <p className={`mt-4 text-xl ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
          A powerful, flexible, and easy-to-use charting library built with React and D3.js
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <a
            href="#examples"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            View Examples
          </a>
          <a
            href="https://github.com/TAIJULAMAN/chart"
            className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md ${currentTheme === 'dark' ? 'text-gray-300 bg-gray-800 hover:bg-gray-700' : 'text-gray-700 bg-gray-100 hover:bg-gray-200'}`}
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
