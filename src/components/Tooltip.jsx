import React from 'react';
import PropTypes from 'prop-types';

const Tooltip = ({ content, x, y }) => {
  if (!content) return null;

  return (
    <div
      className="absolute z-10 px-3 py-2 text-sm bg-gray-900 text-white rounded shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full"
      style={{
        left: x,
        top: y - 8,
      }}
    >
      {content}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 translate-y-full"
        style={{
          bottom: -4,
          width: 0,
          height: 0,
          borderLeft: '4px solid transparent',
          borderRight: '4px solid transparent',
          borderTop: '4px solid #111827',
        }}
      />
    </div>
  );
};

Tooltip.propTypes = {
  content: PropTypes.node,
  x: PropTypes.number,
  y: PropTypes.number,
};

export default Tooltip;
