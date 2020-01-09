import React, { Component } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson';
import G from '../../Chart/Elements/G';

class UsCounties extends Component {

  projection () {
    return d3.geoAlbersUsa();
  }
  ;
  path () {
    return d3.geoPath();
  }
  ;
  zoom () {
    const zoomed = () => {
      d3.selectAll('.map').attr('transform', d3.event.transform);
      d3.selectAll('.map').selectAll('path').style('stroke-width', 1 / d3.event.transform.k + 'px')
    };
    return d3.zoom()
      .scaleExtent([1,20])
      .on('zoom', zoomed )
  }
  ;
  visualizeStates (data) {
    let
      svg = d3.select('.geography'),
      width = svg.attr('width'),
      height = svg.attr('height'),
      g = d3.select('.map'),
      projection = this.projection(),
      path = this.path()
    ;
    projection.scale(width/1.25).translate([width/2, height/2]);
    path.projection(projection);

    svg.call(this.zoom());

    g.selectAll('path')
      .attr('class','states')
      .data(data.features)
      .enter().append('path')
      .attr('class', 'states')
      .attr('d', path )
      .style('stroke-width','.5px')
      .style('stroke','lightgrey')
      .style('fill','none');
  }
  ;
  visualizeCounties (data) {
    let
      svg = d3.select('.geography'),
      width = svg.attr('width'),
      height = svg.attr('height'),
      g = d3.select('.map'),
      projection = this.projection(),
      path = this.path()
      ;
    projection.scale(width/1.25).translate([width/2, height/2]);
    path.projection(projection);

    g.selectAll('path')
      .attr('class','counties')
      .data(feature(data,data.objects.counties).features)
      .enter().append('path')
      .attr('class', d => `county subunit-${d.id}` )
      .attr('d', path )
      .style('stroke-width','0px')
      .style('stroke','white')
      .style('fill','white');
  }
  ;
  componentDidMount() {
    Promise.all([
      fetch('/census/states')
        .then(res => res.json())
        .then( states => this.visualizeStates(states)),
      fetch('/census/counties')
        .then(res => res.json())
        .then( counties => this.visualizeCounties(counties))
    ])
  }
  ;
  render() {
    const { transform } = this.props;
    return (
        <G className='map' transform={ transform }></G>
    )
  }
}

export default UsCounties;