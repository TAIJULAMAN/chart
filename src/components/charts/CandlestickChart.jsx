import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { useTheme } from '../../contexts/ThemeContext';

const CandlestickChart = ({
  data,
  width = 800,
  height = 400,
  margin = { top: 20, right: 20, bottom: 50, left: 50 },
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
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.date))
      .range([0, chartWidth])
      .padding(0.7);

    const yScale = d3.scaleLinear()
      .domain([
        d3.min(data, d => Math.min(d.low, d.open, d.close)),
        d3.max(data, d => Math.max(d.high, d.open, d.close))
      ])
      .range([chartHeight, 0])
      .nice();

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
      .call(d3.axisBottom(xScale)
        .tickFormat(d3.timeFormat('%b %d')))
      .style('color', currentTheme === 'dark' ? '#D1D5DB' : '#4B5563');

    // Rotate x-axis labels
    xAxis.selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    const yAxis = g.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale))
      .style('color', currentTheme === 'dark' ? '#D1D5DB' : '#4B5563');

    // Create candlesticks
    const candlesticks = g.selectAll('.candlestick')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'candlestick')
      .attr('transform', d => `translate(${xScale(d.date)}, 0)`);

    // Add wicks (high-low lines)
    candlesticks.append('line')
      .attr('class', 'wick')
      .attr('y1', d => yScale(d.high))
      .attr('y2', d => yScale(d.low))
      .attr('x1', xScale.bandwidth() / 2)
      .attr('x2', xScale.bandwidth() / 2)
      .style('stroke', d => d.open > d.close 
        ? (currentTheme === 'dark' ? '#EF4444' : '#DC2626')  // Red
        : (currentTheme === 'dark' ? '#10B981' : '#059669')) // Green
      .style('stroke-width', 1)
      .style('opacity', 0)
      .transition()
      .duration(animationDuration)
      .style('opacity', 1);

    // Add bodies (open-close rectangles)
    candlesticks.append('rect')
      .attr('x', 0)
      .attr('y', d => yScale(Math.max(d.open, d.close)))
      .attr('width', xScale.bandwidth())
      .attr('height', d => Math.abs(yScale(d.open) - yScale(d.close)))
      .style('fill', d => d.open > d.close
        ? (currentTheme === 'dark' ? '#EF4444' : '#DC2626')  // Red
        : (currentTheme === 'dark' ? '#10B981' : '#059669')) // Green
      .style('opacity', 0)
      .transition()
      .duration(animationDuration)
      .style('opacity', 1);

    // Add tooltip
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

    candlesticks
      .on('mouseover', (event, d) => {
        tooltip
          .style('opacity', 1)
          .html(`
            <strong>${d3.timeFormat('%B %d, %Y')(d.date)}</strong><br/>
            Open: ${d.open.toFixed(2)}<br/>
            High: ${d.high.toFixed(2)}<br/>
            Low: ${d.low.toFixed(2)}<br/>
            Close: ${d.close.toFixed(2)}<br/>
            ${d.volume ? 'Volume: ' + d.volume.toLocaleString() : ''}
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

    // Add volume bars if volume data is available
    if (data[0].volume) {
      const volumeHeight = chartHeight * 0.2;
      const volumeScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.volume)])
        .range([0, volumeHeight]);

      const volumeGroup = g.append('g')
        .attr('transform', `translate(0, ${chartHeight - volumeHeight})`);

      volumeGroup.selectAll('.volume-bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'volume-bar')
        .attr('x', d => xScale(d.date))
        .attr('y', d => volumeHeight - volumeScale(d.volume))
        .attr('width', xScale.bandwidth())
        .attr('height', d => volumeScale(d.volume))
        .style('fill', d => d.open > d.close
          ? (currentTheme === 'dark' ? '#EF4444' : '#DC2626')
          : (currentTheme === 'dark' ? '#10B981' : '#059669'))
        .style('opacity', 0.3)
        .style('opacity', 0)
        .transition()
        .duration(animationDuration)
        .style('opacity', 0.3);
    }

    return () => {
      tooltip.remove();
    };
  }, [data, width, height, margin, currentTheme, animationDuration]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className="candlestick-chart"
    />
  );
};

CandlestickChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.instanceOf(Date).isRequired,
    open: PropTypes.number.isRequired,
    high: PropTypes.number.isRequired,
    low: PropTypes.number.isRequired,
    close: PropTypes.number.isRequired,
    volume: PropTypes.number,
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

export default CandlestickChart;
