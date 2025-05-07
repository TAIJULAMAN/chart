import React from 'react';

const Footer = ({ currentTheme }) => {
    return (
        <footer className={`${currentTheme === 'dark' ? 'bg-gray-950' : 'bg-gray-900'} text-gray-300 py-12 px-4 sm:px-6 lg:px-8`}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h4 className="text-lg font-semibold mb-4">ChartMaster</h4>
                    <p className="text-gray-400">
                        A powerful, flexible, and easy-to-use charting library built with React and D3.js
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Resources</h4>
                    <ul className="space-y-2">
                        <li><a href="#docs" className="hover:text-blue-400">Documentation</a></li>
                        <li><a href="#examples" className="hover:text-blue-400">Examples</a></li>
                        <li><a href="https://github.com/TAIJULAMAN/chart" className="hover:text-blue-400" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Connect</h4>
                    <ul className="space-y-2">
                        <li><a href="https://github.com/TAIJULAMAN" className="hover:text-blue-400" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                        <li><a href="#" className="hover:text-blue-400">Twitter</a></li>
                        <li><a href="#" className="hover:text-blue-400">Discord</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
