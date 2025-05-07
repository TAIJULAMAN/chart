import React from 'react';

import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const ResponsiveContainer = ({ width = '100%', height = '100%', children }) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width: containerWidth, height: containerHeight } = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: containerWidth,
          height: containerHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const containerStyle = {
    width: width,
    height: height,
    position: 'relative',
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      {dimensions.width > 0 && dimensions.height > 0 &&
        children(dimensions)
      }
    </div>
  );
};

ResponsiveContainer.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.func.isRequired,
};

export default ResponsiveContainer;
