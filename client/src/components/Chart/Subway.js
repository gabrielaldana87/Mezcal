import React, { Component } from 'react';
import G from './Elements/G';
import AxisX from './Elements/AxisX';
import AxisY from './Elements/AxisY';
import './Subway.scss';
import * as d3 from 'd3';
import { feature } from 'topojson';
import _ from 'underscore';
const array = [];
const n_array = [];
const n = 50;

class Subway extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: 200000,
      subway: '1'
    }
  }
  ;
  projection () {
    let
      svg = d3.select('.subway'),
      width = svg.attr('width'),
      height = svg.attr('height')
    ;
    return d3.geoMercator()
      .center([-73.9967, 40.7072])
      .scale(160000)
      .translate([(width) / 2, (height)/2]);
  }
  ;
  path () {
    return d3.geoPath()
      .projection(this.projection());
  }
  ;
  circle () {
    let lines = ['1','2','3','A','B','C','D','E','F','G','J','L','M','N','Q','R','W','Z','4','5','6','7'];
    return d3.select('.subway').selectAll('.point')
      .data(lines)
      .enter().append('circle')
      .attr('r', 3 )
      .attr('cx', 616.9774511869764)
      .attr('cy', 852.8658360008121)
      .attr('id', d => `circle-${d}`)
      .attr('class', 'point')
      // .attr("transform", function(d,i)  { console.log(d[i]); return "translate(" + projection([-73.9667, 40.7172]) +")"})
      .style('fill', 'crimson')
      .style('opacity', .5);
  }
  ;
  transition() {
    let
      duration = this.state.duration,
      track = this.state.subway,
      routePath = d3.selectAll(`.phantom-${track}`),
      translateAlong = this.translateAlong,
      projection = this.projection(),
      tick = d => this.tick(d),
      filter = _.filter( this.state.stations, o => o.properties.line.includes(track) )
      ;
    d3.selectAll('.point')
      .transition()
      .delay(500)
      .ease(d3.easeLinear)
      .duration(duration)
      .attrTween('transform', translateAlong(routePath, projection, filter, tick ) )
      // .each(() => tick )
      // .each( this.transition );
  }
  ;
  translateAlong (routePath, projection, filter, tick ) {
    const
      round = (x, n) => n == null ? Math.round(x) : Math.round(x * (n = Math.pow(10, n))) / n,
      station = (x, y) => _.filter(filter, e => {
        let coord = projection(e.geometry.coordinates);
        return round(coord[1], 0) === round(y, 0) && round(coord[0],0) === round(x,0);
          //&& round(coord[1], 0) == round(y, 0);
      })
      ;
    if(!routePath) return;
      let
        node = routePath.node(),
        l = node.getTotalLength()
        ;
      return function(d, i, a) {
        return function(t) {
          var p = node.getPointAtLength(t * l);
          var addy = (p.y) -852.8658360008121;
          var addx = (p.x) -616.9774511869764;
          var stat = station(p.x, p.y);
          // console.log(stat)
          if (stat[0]){
            stat[0].properties['ts'] = Date.now();
            // console.log(stat[0])
            tick(stat[0]);
          }
          return 'translate(' + addx + ',' + addy + ')' ;
        };
      };
  }
  ;
  line () {
    let
      x = this.xScale(),
      y = this.yScale()
      ;
    return d3.line()
      .curve(d3.curveMonotoneX);
  }
  ;
  tick (point) {
    array.push(point);
    let
      g = d3.select('.income-graph'),
      now = new Date(),
      line = this.line(point),
      x = this.xScale(),
      y = this.yScale(),
      uniq = _.uniq(array, o => o.properties.name ),
      neighborhoods = _.uniq(uniq, o => o.properties.neighborhood ),
      height = g.attr('height') + 5
    ;
    x.domain([ d3.min(uniq, d => d.properties.ts ),  d3.max(uniq, d => d.properties.ts )])
    ;
    const path = d3.select('.income-graph .income-line')
      .datum(uniq)
      .attr('d', line.x(d => x(d.properties.ts)).y(d => y(d.properties.dp03_0062e)) )
      .style('fill', 'none')
      .style('stroke', '#e74c3c')
      .style('stroke-width', 2)
      .attr('transform', null)
    // .attr('transform', d => { return `translate(${x(d.properties.ts)})`})
    // .transition()
    // .duration(500)

    d3.select('.axis.axis--x').call(d3.axisBottom(x).ticks(3))
    ;
    const circle = g.selectAll('circle').data(uniq)
    ;
    circle.exit().remove()
    ;
    circle.enter().append('circle')
    ;
    circle
      .attr('class','station-circle')
      .attr('cx', d => x(d.properties.ts))
      .attr('cy', d => y(d.properties.dp03_0062e))
      .attr('r', 3)
      .style('stroke-width', 1)
      .style('stroke','red')
      .style('fill', 'white')
    ;
    const rect = g.selectAll('rect').data(neighborhoods)
    ;
    rect.exit().remove()
    ;
    rect.enter().append('rect').attr('class','neigh-rect')
    ;
    rect
      .attr('x', d => x(d.properties.ts))
      .attr('height', d => y(height) - y(d.properties.dp03_0062e) )
      .attr('width', 1)
      .attr('y', d => y(d.properties.dp03_0062e))
      .style('stroke', '#ddd')
      .style('fill', 'grey')
      .style('stroke-dasharray', '4,4')
      .append('text').attr('class','neigh-rect')
    ;
    const text = g.selectAll('.neigh-text').data(neighborhoods)
    ;
    text.exit().remove()
    ;
    text.enter().append('text')
      .attr('class', 'neigh-text')
    ;
    text
      .attr('x', d => x(d.properties.ts))
      .text(d => d.properties.neighborhood)
      .attr('y', d => y(d.properties.dp03_0062e))
      // .attr('transform', d => 'rotate(-90)')
  }
  ;
  setDomain (var_name) {
    let data = this.state.stations;
    return [
      d3.min(data, d => +d['properties'][var_name] > 0 ? +d['properties'][var_name] : null),
      d3.max(data, d => +d['properties'][var_name])
    ]
  }
  ;
  xScale () {
    let
      now = new Date(),
      width = d3.select('.income-graph').attr('width'),
      domain = [now - (n - 2) * 750, now - 750]
      ;
    this.setState({ xDomain: domain })
    ;
    return d3.scaleLinear().range([0, width]).domain(domain)
    ;
  }
  ;
  yScale () {
    let
      height = d3.select('.income-graph').attr('height'),
      domain = this.setDomain('dp03_0062e')
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
      xAxis = d3.axisBottom(xScale).ticks(3)
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
  ready (data) {
    let
      svg = d3.select('.subway'),
      geography = data[0],
      routes = data[1],
      phantom = data[2],
      stations = data[3],
      zcta = data[4],
      path = this.path(),
      track = this.state.subway,
      projection = this.projection(),
      translateAlong = this.translateAlong,
      circle = this.circle(),
      lines = ['1','2','3','A','B','C','D','E','F','G','J','L','M','N','Q','R','W','Z','4','5','6','7']
      ;
    d3.select('.borough_overlay').selectAll('path.borough_overlay')
      .data(feature(geography, geography.objects.nyc).features)
      .enter()
      .append('path')
      .attr('d', path )
      .attr('class','borough_map')
    ;
   // console.log(stations);

    // d3.select('.zcta_overlay').selectAll('path.zcta_overlay')
    //   .data(zcta.features)
    //   .enter()
    //   .append('path')
    //   .attr('d', path )
    //   .attr('class', 'census_tracts')
    //   .attr('stroke-width', '.05px')
    //   .attr('stroke', 'black')


    svg.selectAll('.stations')
      .data(stations.features)
      .enter()
      .append('circle')
      .attr('r', 3 )
      .attr('cx', d => projection(d.geometry.coordinates)[0] )
      .attr('cy', d => projection(d.geometry.coordinates)[1] )
      .attr('fill', 'rgba(255,255,255,0)')
      .attr('stroke', 'grey')
    ;
    svg.selectAll('.income')
      .data(stations.features)
      .enter()
      .append('text')
      .attr('dx', d => { return projection(d.geometry.coordinates)[0] + 4 })
      .attr('dy', d => { return projection(d.geometry.coordinates)[1] + 4 })
      .text(d =>  d.properties.line.includes(track) ?  d.properties.name :null) //d.properties.name  : null)
      .style('fill','black')
      .style('font-size','8px')
    ;

    // var output = [];
  // const sort = (a,b) => a[0] - b[0];
  // routes.features.sort((a,b) => a.properties.id - b.properties.id ).forEach(item => {
  //   var existing = output.filter((v, i) => {
  //    return v.properties.name === item.properties.name;
  //   });
  //   if (existing.length) {
  //     var existingIndex = output.indexOf(existing[0]);
  //     output[existingIndex].geometry.coordinates = output[existingIndex].geometry.coordinates.concat(item.geometry.coordinates.sort(sort));
  //   }
  //   else {
  //     console.log(item)
  //     output.push(item);
  //   }
  // });

    // console.log(routes.features, output);

    d3.select('.feature-group').selectAll('.route')
      .data(routes.features)
      .enter()
      .append('path')
      .attr('class', d => `route line-${d.properties.rt_symbol}` )
      // .attr('class', d => `route line-${d.name}`)
      .attr('d', (d,i) => {
        let array = [];
        if(d.geometry.type==='LineString') {
          array.push(d.geometry.coordinates);
        }
        if(d.geometry.type==='MultiLineString') {
          d.geometry.coordinates.forEach( each => {
            array.push(each);
          });
        }
        return path({
          type: 'MultiLineString',
          coordinates: array
        });
      })
      .style('stroke-opacity', 1)
      .style('stroke-width', 2)
      // .attr('transform', d =>
      //   `translate(${lines.indexOf(d.properties.rt_symbol)/3},${lines.indexOf(d.properties.rt_symbol)/3})`)
      .on('mouseover', (d,i) => { });

    d3.select('.phantom-group').selectAll('.phantom-route')
      .data(phantom.routes)
      .enter()
      .append('path')
      .attr('class', d => `route phantom-${d.name}`)
      .attr('d', (d,i) => {
        let array = [];

        if(d.geometry.type==='LineString') {
          array.push(d.geometry.coordinates);
        }
        if(d.geometry.type==='MultiLineString') {
          d.geometry.coordinates.forEach( each => {
            array.push(each);
          });
        }
        return path({
          type: 'MultiLineString',
          coordinates: array
        });
      })
      .style('stroke-opacity', 1)
      .style('stroke-width', 1)
      // .attr('transform', d =>
      //   `translate(${lines.indexOf(d.properties.rt_symbol)/3},${lines.indexOf(d.properties.rt_symbol)/3})`)

    d3.select('.income-graph').append('path').attr('class', 'income-line');

    this.setState({stations: stations.features});

    this.setYAxis();

    this.setXAxis();

    this.transition();

  }
  ;
  componentDidMount () {
    Promise.all([
      d3.json('./data/topo_nyc.json'),
      d3.json('./data/subway-lines.geojson'),
      d3.json('./data/transitland_routes.json'),
      d3.json('./data/subway_stations_merged.json'),
      d3.json('./data/tracts_nyc.geojson')
    ])
    .then( data => this.ready(data) )
    ;
  }
  ;
  render () {
    const
      style = {width: 1400, height: 1500},
      width = style.width / 3.25,
      height = style.height / 2.20,
      margin = {top: 90, right: 50, bottom: 20, left: 90},
      transform = `translate(${ margin.left },${ margin.top })`,
      positionX = `translate(0,${height})`,
      transformLabel = 'rotate(-90)'
    ;
    return (
      <svg className='subway' {...style} >
        <g className='feature-group'>
        </g>
        <g className='phantom-group'>
        </g>
        <g className='borough_overlay'>
        </g>
        <g className='zcta_overlay'>
        </g>
        <G className='income-graph'
           width={ width }
           height={ height }
           transform={ transform }
        >
          <AxisX
            x={ width }
            y={ -6 }
            text='Median Household Income By Subway Station Location'
            fontSize={ 2 }
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
      </svg>
    )
  }
}

export default Subway;