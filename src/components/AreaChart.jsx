import React from 'react';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const AreaChart = ({
  data,
  width,
  height,
  margin = { top: 20, right: 20, bottom: 30, left: 40 },
  xKey,
  yKey,
  fill = '#3b82f6',
  fillOpacity = 0.3,
  stroke = '#2563eb',
  onAreaHover,
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

  const area = useMemo(() => {
    return d3.area()
      .x(d => xScale(d[xKey]))
      .y0(chartHeight)
      .y1(d => yScale(d[yKey]))
      .curve(d3.curveMonotoneX);
  }, [xScale, yScale, xKey, yKey, chartHeight]);

  const line = useMemo(() => {
    return d3.line()
      .x(d => xScale(d[xKey]))
      .y(d => yScale(d[yKey]))
      .curve(d3.curveMonotoneX);
  }, [xScale, yScale, xKey, yKey]);

  return (
    <svg width={width} height={height}>
      <defs>
        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fill} stopOpacity={0.4} />
          <stop offset="100%" stopColor={fill} stopOpacity={0.1} />
        </linearGradient>
      </defs>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {/* Grid Lines */}
        {yScale.ticks().map(tick => (
          <line
            key={tick}
            x1={0}
            x2={chartWidth}
            y1={yScale(tick)}
            y2={yScale(tick)}
            stroke="#e5e7eb"
            strokeDasharray="4,4"
          />
        ))}

        {/* Area */}
        <path
          d={area(data)}
          fill="url(#areaGradient)"
          className="transition-all duration-300 hover:opacity-80"
          onMouseEnter={() => onAreaHover && onAreaHover(data)}
          onMouseLeave={() => onAreaHover && onAreaHover(null)}
        />

        {/* Line */}
        <path
          d={line(data)}
          fill="none"
          stroke={stroke}
          strokeWidth={2}
          className="transition-all duration-300"
        />

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

        {/* Data Points */}
        {data.map((d, i) => (
          <circle
            key={i}
            cx={xScale(d[xKey])}
            cy={yScale(d[yKey])}
            r={4}
            fill="white"
            stroke={stroke}
            strokeWidth={2}
            className="transition-all duration-300 hover:r-6"
          />
        ))}
      </g>
    </svg>
  );
};

AreaChart.propTypes = {
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
  fillOpacity: PropTypes.number,
  stroke: PropTypes.string,
  onAreaHover: PropTypes.func,
};

export default AreaChart;
