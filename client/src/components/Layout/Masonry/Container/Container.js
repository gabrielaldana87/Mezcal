import React, { Component } from 'react';
import './Container.scss';

class Container extends Component {
  render(){
    const { children } = this.props;
    return(
      <div className='bd bgc-white'>
        <div className='peers fxw-nw@lg+ ai-s'>
          <div className='next-to-content'>
            { children }
          </div>
        </div>
      </div>
    )
  }
}

export default Container;