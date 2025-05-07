import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { useTheme } from '../../contexts/ThemeContext';

const BubbleChart = ({
  data,
  width = 600,
  height = 400,
  margin = { top: 20, right: 20, bottom: 40, left: 40 },
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

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.x) * 0.9, d3.max(data, d => d.x) * 1.1])
      .range([0, chartWidth]);

    const yScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.y) * 0.9, d3.max(data, d => d.y) * 1.1])
      .range([chartHeight, 0]);

    const rScale = d3.scaleSqrt()
      .domain([0, d3.max(data, d => d.value)])
      .range([2, 25]);

    const colorScale = d3.scaleOrdinal()
      .domain(data.map(d => d.category))
      .range(d3.schemeCategory10);

    // Create chart group
    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Add gridlines
    g.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(d3.axisBottom(xScale)
        .tickSize(-chartHeight)
        .tickFormat('')
      )
      .style('stroke', currentTheme === 'dark' ? '#4B5563' : '#E5E7EB')
      .style('stroke-opacity', 0.3);

    g.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft(yScale)
        .tickSize(-chartWidth)
        .tickFormat('')
      )
      .style('stroke', currentTheme === 'dark' ? '#4B5563' : '#E5E7EB')
      .style('stroke-opacity', 0.3);

    // Add axes
    const xAxis = g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(d3.axisBottom(xScale))
      .style('color', currentTheme === 'dark' ? '#D1D5DB' : '#4B5563');

    const yAxis = g.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale))
      .style('color', currentTheme === 'dark' ? '#D1D5DB' : '#4B5563');

    // Add bubbles with animation
    const bubbles = g.selectAll('.bubble')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'bubble')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 0)
      .style('fill', d => colorScale(d.category))
      .style('fill-opacity', 0.7)
      .style('stroke', d => d3.color(colorScale(d.category)).darker())
      .style('stroke-width', 1);

    // Add labels
    const labels = g.selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', d => xScale(d.x))
      .attr('y', d => yScale(d.y) - rScale(d.value) - 5)
      .style('text-anchor', 'middle')
      .style('fill', currentTheme === 'dark' ? '#D1D5DB' : '#4B5563')
      .style('font-size', '12px')
      .style('opacity', 0)
      .text(d => d.label);

    // Animate bubbles
    bubbles.transition()
      .duration(animationDuration)
      .ease(d3.easeElasticOut)
      .attr('r', d => rScale(d.value));

    // Animate labels
    labels.transition()
      .duration(animationDuration)
      .style('opacity', 1);

    // Add tooltips
    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('padding', '8px')
      .style('background', currentTheme === 'dark' ? '#374151' : '#FFFFFF')
      .style('border', '1px solid')
      .style('border-color', currentTheme === 'dark' ? '#4B5563' : '#E5E7EB')
      .style('border-radius', '4px')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .style('color', currentTheme === 'dark' ? '#D1D5DB' : '#4B5563');

    bubbles
      .on('mouseover', (event, d) => {
        tooltip
          .style('opacity', 1)
          .html(`
            <strong>${d.label}</strong><br/>
            X: ${d.x}<br/>
            Y: ${d.y}<br/>
            Value: ${d.value}<br/>
            Category: ${d.category}
          `);
      })
      .on('mousemove', (event) => {
        tooltip
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px');
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      });

    // Add legend
    const legend = svg
      .append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${width - margin.right}, ${margin.top})`);

    const categories = [...new Set(data.map(d => d.category))];
    categories.forEach((category, i) => {
      const legendItem = legend
        .append('g')
        .attr('transform', `translate(0, ${i * 20})`);

      legendItem
        .append('circle')
        .attr('r', 5)
        .attr('fill', colorScale(category));

      legendItem
        .append('text')
        .attr('x', 15)
        .attr('y', 5)
        .style('font-size', '12px')
        .style('fill', currentTheme === 'dark' ? '#D1D5DB' : '#4B5563')
        .text(category);
    });

    return () => {
      tooltip.remove();
    };
  }, [data, width, height, margin, currentTheme, animationDuration]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className="bubble-chart"
    />
  );
};

BubbleChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
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

export default BubbleChart;
