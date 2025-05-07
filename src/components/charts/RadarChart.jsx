import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { useTheme } from '../../contexts/ThemeContext';

const RadarChart = ({ 
  data,
  width = 500,
  height = 500,
  margin = { top: 50, right: 50, bottom: 50, left: 50 },
  animationDuration = 1000
}) => {
  const svgRef = useRef(null);
  const { currentTheme } = useTheme();

  useEffect(() => {
    if (!data || !data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Calculate dimensions
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const radius = Math.min(chartWidth, chartHeight) / 2;

    // Create chart group
    const g = svg
      .append('g')
      .attr('transform', `translate(${width/2}, ${height/2})`);

    // Get all unique axes from data
    const features = Object.keys(data[0]).filter(key => key !== 'name');
    const numFeatures = features.length;

    // Scale for the spokes
    const angleScale = d3.scaleLinear()
      .domain([0, numFeatures])
      .range([0, 2 * Math.PI]);

    // Scale for data values
    const valueScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d3.max(features, f => d[f]))])
      .range([0, radius]);

    // Create background circles
    const levels = 5;
    const circles = g.selectAll('.level')
      .data(d3.range(1, levels + 1))
      .enter()
      .append('circle')
      .attr('class', 'level')
      .attr('r', d => (radius * d) / levels)
      .style('fill', 'none')
      .style('stroke', currentTheme === 'dark' ? '#4B5563' : '#E5E7EB')
      .style('stroke-width', 0.5);

    // Create spokes
    const spokes = g.selectAll('.spoke')
      .data(features)
      .enter()
      .append('line')
      .attr('class', 'spoke')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (d, i) => radius * Math.cos(angleScale(i) - Math.PI/2))
      .attr('y2', (d, i) => radius * Math.sin(angleScale(i) - Math.PI/2))
      .style('stroke', currentTheme === 'dark' ? '#4B5563' : '#E5E7EB')
      .style('stroke-width', 0.5);

    // Create axis labels
    const labels = g.selectAll('.axis-label')
      .data(features)
      .enter()
      .append('text')
      .attr('class', 'axis-label')
      .attr('x', (d, i) => (radius + 20) * Math.cos(angleScale(i) - Math.PI/2))
      .attr('y', (d, i) => (radius + 20) * Math.sin(angleScale(i) - Math.PI/2))
      .style('text-anchor', 'middle')
      .style('dominant-baseline', 'middle')
      .style('fill', currentTheme === 'dark' ? '#D1D5DB' : '#4B5563')
      .style('font-size', '12px')
      .text(d => d);

    // Create the radar paths
    const radarLine = d3.lineRadial()
      .radius(d => valueScale(d.value))
      .angle((d, i) => angleScale(i));

    const colorScale = d3.scaleOrdinal()
      .domain(data.map(d => d.name))
      .range(d3.schemeCategory10);

    // Create radar areas with animation
    data.forEach((d, i) => {
      const dataPoints = features.map(f => ({ value: d[f] }));
      
      const path = g.append('path')
        .datum(dataPoints)
        .attr('class', 'radar-area')
        .attr('fill', colorScale(d.name))
        .attr('fill-opacity', 0.2)
        .attr('stroke', colorScale(d.name))
        .attr('stroke-width', 2)
        .attr('d', radarLine);

      // Animate path on creation
      const pathLength = path.node().getTotalLength();
      path
        .attr('stroke-dasharray', pathLength + ' ' + pathLength)
        .attr('stroke-dashoffset', pathLength)
        .transition()
        .duration(animationDuration)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0);
    });

    // Add legend
    const legend = svg
      .append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${width - margin.right}, ${margin.top})`);

    data.forEach((d, i) => {
      const legendItem = legend
        .append('g')
        .attr('transform', `translate(0, ${i * 20})`);

      legendItem
        .append('rect')
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', colorScale(d.name));

      legendItem
        .append('text')
        .attr('x', 15)
        .attr('y', 9)
        .style('font-size', '12px')
        .style('fill', currentTheme === 'dark' ? '#D1D5DB' : '#4B5563')
        .text(d.name);
    });

  }, [data, width, height, margin, currentTheme, animationDuration]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className="radar-chart"
    />
  );
};

RadarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
  }),
  animationDuration: PropTypes.number,
};

export default RadarChart;
