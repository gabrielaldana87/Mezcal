import React, { Component } from 'react';
import MainContainer from '../../Layout/Masonry/MainContainer';
import Container from '../../Layout/Masonry/Container/Container';
import ContainmentCard from '../../Layout/Masonry/Container/ContainmentCard';
import ContainmentWidget from '../../Layout/Masonry/Container/ContainmentWidget';
import Column from '../../Layout/Masonry/Column';
import Svg from '../../Chart/Elements/Svg';
import UsCounties from '../../Chart/Geography/UsCounties';
import ScatterPlot from '../../Chart/Graph/ScatterPlot';
import 'rheostat/initialize';
import Rheostat from 'rheostat';
import * as d3 from 'd3';
import './Census.scss';

const sequentialScale = d3.scaleSequential(d3.interpolatePlasma);

class Census extends Component {

  constructor(props) {
    super(props);
    this.state = {
      values: props.values
    };
    this.updateValue = this.updateValue.bind(this);
  }
  ;
  updateValue(sliderState) {
    let values = sliderState.values;
    d3.selectAll('.point').classed('selected', d => values[0] <= d.rate_one && d.rate_one <= values[1]);
    let a = d3.selectAll('.point.selected').data();
    let filterDom = [d3.min(a, o =>  o.rate_one ),d3.max(a, o => o.rate_one )];
    sequentialScale.domain(filterDom);
    d3.selectAll('.county').style('fill','none')
    d3.selectAll('.point.selected').each( d => {
      return d3.select(`.subunit-${d.id}`).transition().duration(100).style('fill', sequentialScale(d['rate_one']));
    });
    this.setState({
      values: sliderState.values,
    });
  }
  ;
  render () {
    const
      dimensions = { width: 900, height: 600 },
      widget_style = { marginLeft: 100 },
      margin = {top: 90, right: 50, bottom: 20, left: 90},
      transform = `translate(${ margin.left },${ margin.top })`,
      dimensions_inner = { width: dimensions.width - margin.left - margin.right, height: dimensions.height - margin.top - margin.bottom }
    ;
    return (
      <MainContainer>
        <Column colNum={ 9 }>
          <Container>
            <ContainmentCard title='US Counties Data'>
              <Svg className='plot' {...dimensions }>
                <ScatterPlot
                  {...dimensions_inner } transform={ transform }
                />
              </Svg>
              <Svg className='geography' {...dimensions }>
                <UsCounties/>
              </Svg>
            </ContainmentCard>
          </Container>
        </Column>
        <Column colNum={ 3 }>
          <ContainmentWidget title='Value Slider'>
            <div className='widget-content'>
              <div className='rheostat-slider-container'>
                <Rheostat
                  pitComponent='test'
                  pitPoints={ [0, 25, 50, 75, 100]}
                  min={1}
                  max={100}
                  values={[1,100]}
                />
              </div>
              <div className='rheostat-slider-container'>
                <Rheostat
                  pitComponent='test'
                  pitPoints={ [20000, 40000, 80000, 120000]}
                  onValuesUpdated={ this.updateValue }
                  min={20000}
                  max={120000}
                  values={[20000,120000]}
                />
              </div>
            </div>
          </ContainmentWidget>
        </Column>
      </MainContainer>
    )
  }
}

export default Census;