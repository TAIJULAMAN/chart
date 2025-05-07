import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const FEATURES = [
  { title: 'Responsive', desc: 'Charts that automatically adapt to any screen size', icon: '📱' },
  { title: 'Customizable', desc: 'Extensive styling options and theming support', icon: '🎨' },
  { title: 'Interactive', desc: 'Rich interactions with tooltips and animations', icon: '🎯' },
  { title: 'Multiple Chart Types', desc: 'Line, Bar, Area, Pie charts and more', icon: '📊' },
  { title: 'React-Based', desc: 'Built with modern React patterns and hooks', icon: '⚛️' },
  { title: 'Lightweight', desc: 'Optimized bundle size for better performance', icon: '🚀' },
];

const Features = () => {
  const { currentTheme } = useTheme();

  return (
    <section id="features" className={`py-16 px-4 sm:px-6 lg:px-8 ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto">
        <h3 className={`text-2xl font-bold ${currentTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'} mb-8`}>Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
            <div 
              key={i} 
              className={`p-6 rounded-lg transform transition-all duration-200 hover:scale-105 ${currentTheme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'}`}
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h4 className={`text-lg font-semibold mb-2 ${currentTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                {feature.title}
              </h4>
              <p className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
