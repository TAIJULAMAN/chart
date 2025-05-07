import React from 'react';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const BarChart = ({
  data,
  width,
  height,
  margin = { top: 20, right: 20, bottom: 30, left: 40 },
  xKey,
  yKey,
  fill = '#3b82f6',
  onBarHover,
}) => {
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const xScale = useMemo(() => {
    return d3.scaleBand()
      .domain(data.map(d => d[xKey]))
      .range([0, chartWidth])
      .padding(0.1);
  }, [data, xKey, chartWidth]);

  const yScale = useMemo(() => {
    return d3.scaleLinear()
      .domain([0, d3.max(data, d => d[yKey])])
      .range([chartHeight, 0]);
  }, [data, yKey, chartHeight]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {/* X Axis */}
        <g transform={`translate(0,${chartHeight})`}>
          {xScale.domain().map(tick => (
            <g key={tick} transform={`translate(${xScale(tick) + xScale.bandwidth() / 2},0)`}>
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

        {/* Bars */}
        {data.map((d, i) => (
          <rect
            key={i}
            x={xScale(d[xKey])}
            y={yScale(d[yKey])}
            width={xScale.bandwidth()}
            height={chartHeight - yScale(d[yKey])}
            fill={fill}
            className="transition-all duration-300 hover:brightness-90"
            onMouseEnter={() => onBarHover && onBarHover(d)}
            onMouseLeave={() => onBarHover && onBarHover(null)}
          />
        ))}
      </g>
    </svg>
  );
};

BarChart.propTypes = {
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
  fill: PropTypes.string,
  onBarHover: PropTypes.func,
};

export default BarChart;
