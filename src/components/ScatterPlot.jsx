import React from 'react';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const ScatterPlot = ({
  data,
  width,
  height,
  margin = { top: 20, right: 20, bottom: 30, left: 40 },
  xKey,
  yKey,
  colors = d3.schemeCategory10,
  groupKey,
  pointRadius = 6,
  onPointHover,
}) => {
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const xScale = useMemo(() => {
    return d3.scaleLinear()
      .domain(d3.extent(data, d => d[xKey]))
      .range([0, chartWidth])
      .nice();
  }, [data, xKey, chartWidth]);

  const yScale = useMemo(() => {
    return d3.scaleLinear()
      .domain(d3.extent(data, d => d[yKey]))
      .range([chartHeight, 0])
      .nice();
  }, [data, yKey, chartHeight]);

  const colorScale = useMemo(() => {
    if (!groupKey) return () => colors[0];
    const groups = [...new Set(data.map(d => d[groupKey]))];
    return d3.scaleOrdinal()
      .domain(groups)
      .range(colors);
  }, [data, groupKey, colors]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {/* Grid Lines */}
        {xScale.ticks().map(tick => (
          <line
            key={`x-${tick}`}
            y1={0}
            y2={chartHeight}
            x1={xScale(tick)}
            x2={xScale(tick)}
            stroke="#e5e7eb"
            strokeDasharray="4,4"
          />
        ))}
        {yScale.ticks().map(tick => (
          <line
            key={`y-${tick}`}
            x1={0}
            x2={chartWidth}
            y1={yScale(tick)}
            y2={yScale(tick)}
            stroke="#e5e7eb"
            strokeDasharray="4,4"
          />
        ))}

        {/* Data Points */}
        {data.map((d, i) => (
          <circle
            key={i}
            cx={xScale(d[xKey])}
            cy={yScale(d[yKey])}
            r={pointRadius}
            fill={colorScale(d[groupKey])}
            className="transition-all duration-300 hover:opacity-80"
            onMouseEnter={() => onPointHover && onPointHover(d)}
            onMouseLeave={() => onPointHover && onPointHover(null)}
          >
            <title>{`${xKey}: ${d[xKey]}, ${yKey}: ${d[yKey]}`}</title>
          </circle>
        ))}

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
      </g>
    </svg>
  );
};

ScatterPlot.propTypes = {
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
  colors: PropTypes.arrayOf(PropTypes.string),
  groupKey: PropTypes.string,
  pointRadius: PropTypes.number,
  onPointHover: PropTypes.func,
};

export default ScatterPlot;
