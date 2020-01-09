import React , { Component } from 'react';
import G from '../../Chart/Elements/G';
import AxisX from '../../Chart/Elements/AxisX';
import AxisY from '../../Chart/Elements/AxisY';
import * as d3 from 'd3';

class ScatterPlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  ;
  xScale () {
    let
      width = this.props.width,
      domain = this.setDomain('rate_one')
    ;
    this.setState({ xDomain: domain })
    ;
    return d3.scaleLinear().range([0, width]).domain(domain)
    ;
  }
  ;
  yScale () {
    let
      height = this.props.height,
      domain = this.setDomain('rate_two')
    ;
    this.setState({yDomain: domain })
    ;
    return d3.scaleLinear().range([height, 0]).domain(domain)
    ;
  }
  ;
  setXAxis () {
    let
      xScale = this.xScale(),
      xAxis = d3.axisBottom(xScale)
    ;
    d3.select('.axis.axis--x')
      .call(xAxis)
  }
  ;
  setYAxis () {
    let
      yScale = this.yScale(),
      yAxis = d3.axisLeft(yScale)
    ;
    d3.select('.axis.axis--y')
      .call(yAxis)
  }
  ;
  X (d) {
    if(d['rate_one']) {
      let xScale = this.xScale();
      return xScale(d['rate_one']);
    }
  }
  ;
  Y (d) {
    if(d['rate_two']) {
      let yScale = this.yScale();
      return yScale(d['rate_two']);
    }
  }
  colorMe (d) {
    return d['color'];
  }
  ;
  ready (data) {
    this.setState({data:data});
    this.setYAxis();
    this.setXAxis();

    let
      svg = d3.select('.plot'),
      g = d3.select('.analysis'),
      X = d => this.X(d),
      Y = d => this.Y(d),
      colourMe = d => this.colorMe(d)
    ;
    g.selectAll('.point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'point' )
      .attr('r', 2)
      .attr('cx', d => X(d) )
      .attr('cy', d => Y(d) )
      .attr('fill', d => colourMe(d) )
      .style('opacity', .75 )
    ;
  }
  ;
  setDomain (var_name) {
    let data = this.state.data;
    return [
      d3.min(data, d => d[var_name]),
      d3.max(data, d => d[var_name])
    ]
  }
  ;
  componentDidMount() {
    fetch('/census/bivariate')
      .then(res => res.json())
      .then(bivariate => this.ready(bivariate))
  }
  ;
  render () {
    const { transform, width, height } = this.props;
    const positionX = `translate(0,${height})`;
    const transformLabel = 'rotate(-90)';
    return(
      <G className='analysis'
         width={ width }
         height={ height }
         transform={ transform }
      >
        <AxisX
          x={ width }
          y={ -6 }
          text='text me'
          position={ positionX }
        />
        <AxisY
          x={ width }
          y= { 6 }
          dy='.71em'
          text='test me'
          transformText={ transformLabel }
        />
      </G>
    )
  }
}

export default ScatterPlot;