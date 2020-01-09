import React, { Component } from 'react';

class Column extends Component {
  render(){
    const { children, colNum } = this.props;
    const className = `masonry-item col-${colNum}`;
    return(
      <div className={ className }>
        { children }
      </div>
    )
  }
}

export default Column;