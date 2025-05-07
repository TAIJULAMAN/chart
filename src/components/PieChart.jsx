import React from 'react';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const PieChart = ({
  data,
  width,
  height,
  margin = { top: 20, right: 20, bottom: 20, left: 20 },
  valueKey,
  labelKey,
  colors = d3.schemeCategory10,
  onSliceHover,
}) => {
  const radius = Math.min(width - margin.left - margin.right, height - margin.top - margin.bottom) / 2;

  const pie = useMemo(() => {
    return d3.pie()
      .value(d => d[valueKey])
      .sort(null);
  }, [valueKey]);

  const arc = useMemo(() => {
    return d3.arc()
      .innerRadius(0)
      .outerRadius(radius);
  }, [radius]);

  const colorScale = useMemo(() => {
    return d3.scaleOrdinal()
      .domain(data.map(d => d[labelKey]))
      .range(colors);
  }, [data, labelKey, colors]);

  const arcs = useMemo(() => {
    return pie(data);
  }, [data, pie]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${width / 2},${height / 2})`}>
        {arcs.map((d, i) => (
          <g key={i} className="transition-all duration-300 hover:opacity-80">
            <path
              d={arc(d)}
              fill={colorScale(d.data[labelKey])}
              onMouseEnter={() => onSliceHover && onSliceHover(d.data)}
              onMouseLeave={() => onSliceHover && onSliceHover(null)}
            />
            {/* Labels */}
            {d.endAngle - d.startAngle > 0.25 && (
              <text
                transform={`translate(${arc.centroid(d)})`}
                dy=".35em"
                textAnchor="middle"
                className="text-xs fill-white font-medium"
              >
                {d.data[labelKey]}
              </text>
            )}
          </g>
        ))}
      </g>
    </svg>
  );
};

PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
  }),
  valueKey: PropTypes.string.isRequired,
  labelKey: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string),
  onSliceHover: PropTypes.func,
};

export default PieChart;
