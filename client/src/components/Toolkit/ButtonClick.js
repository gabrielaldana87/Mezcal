import React, { Component } from 'react';
import './Toolkit.scss';
import * as d3 from 'd3';

class ButtonClick extends  Component {
  constructor(props) {
   super(props);
    this.state = {
      active: false
    }
    ;
    this.onClick = this.onClick.bind(this);
  }
  ;
  onClick (evt) {
    let
      active = this.state.active,
      p = d3.selectAll('.card-title-html p'),
      t = d3.transition().duration(1000),
      delay = d3.transition().delay(1000)
    ;
    this.setState({ active: !active });
    active ? p.style('display', null) :
      p.style('display', 'none')
  }
  ;
  render () {
    return (
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        onClick={this.onClick}
      >
      </button>
    )
  }
}

export default ButtonClick;