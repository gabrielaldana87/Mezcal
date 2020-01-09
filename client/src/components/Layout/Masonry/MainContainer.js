import React, { Component } from 'react';
import './MainContainer.scss';

class MainContainer extends Component {
  render(){
    const { children } = this.props;
    return(
      <div className='row gap-20 masonry pos-r'>
        <div className='masonry-sizer col-md-12'></div>
        { children }
      </div>
    )
  }
}

export default MainContainer;