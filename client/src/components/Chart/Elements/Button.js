import React, { Component } from 'react';
import G from './G';
import * as d3 from 'd3';

class Button extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  ;
  componentDidMount () {
    const
      { className, onClick, data, cx, cy, radius, circleClass } = this.props,
      g = d3.select(`.${ className }`),
      circle = g.selectAll('circle').data(data),
      text = g.selectAll('text').data(data)
      ;
    circle.exit().remove()
    ;
    circle.enter().append('circle')
      .attr('class', circleClass )
      .attr('cx', cx )
      .attr('cy', cy )
      .attr('r', radius )
      .style('opacity', .75)
      .attr('transform', (d,i) => `translate(${i * 50},-10)`)
      .on('click', onClick )
    ;
    text.exit().remove()
    ;
    text.enter().append('text')
      .attr('class', 'subway-label')
      .attr('x', d => 141 )
      .attr('y', d => 60 )
      .attr('transform', (d,i) => `translate(${i * 50},-10)`)
      .text(d => d )
    ;
  }
  ;
  render () {
    const
      { className } = this.props ,
      style = { width:200, height:200, backgroundColor: 'red'};
    return (
      <G className={ className } { ...style }></G>
    )
  }
}

export default Button;