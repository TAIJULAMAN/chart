import React from 'react';

import { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const LineChart = ({ 
  data, 
  width, 
  height, 
  margin = { top: 20, right: 20, bottom: 30, left: 40 },
  xKey,
  yKey,
  stroke = '#2563eb',
  strokeWidth = 2
}) => {
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const xScale = useMemo(() => {
    return d3.scaleLinear()
      .domain(d3.extent(data, d => d[xKey]))
      .range([0, chartWidth]);
  }, [data, xKey, chartWidth]);

  const yScale = useMemo(() => {
    return d3.scaleLinear()
      .domain([0, d3.max(data, d => d[yKey])])
      .range([chartHeight, 0]);
  }, [data, yKey, chartHeight]);

  const line = useMemo(() => {
    return d3.line()
      .x(d => xScale(d[xKey]))
      .y(d => yScale(d[yKey]));
  }, [xScale, yScale, xKey, yKey]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {/* X Axis */}
        <g transform={`translate(0,${chartHeight})`}>
          {xScale.ticks().map(tick => (
            <g key={tick} transform={`translate(${xScale(tick)},0)`}>
              <line y2={6} stroke="currentColor" />
              <text
                y={9}
                dy="0.71em"
                textAnchor="middle"
                className="text-xs fill-gray-500"
              >
                {tick}
              </text>
            </g>
          ))}
        </g>
        
        {/* Y Axis */}
        <g>
          {yScale.ticks().map(tick => (
            <g key={tick} transform={`translate(0,${yScale(tick)})`}>
              <line x2={-6} stroke="currentColor" />
              <text
                x={-9}
                dy="0.32em"
                textAnchor="end"
                className="text-xs fill-gray-500"
              >
                {tick}
              </text>
            </g>
          ))}
        </g>

        {/* Line */}
        <path
          d={line(data)}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      </g>
    </svg>
  );
};

LineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
  }),
  xKey: PropTypes.string.isRequired,
  yKey: PropTypes.string.isRequired,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
};

export default LineChart;
