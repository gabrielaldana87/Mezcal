import React, { Component } from 'react';

class ContainmentWidget extends Component {
  render(){
    const { children, title } = this.props;
    const style = { minHeight: '200px', marginBottom: '20px' };
    return(
      <div className='layers bd bgc-white p-20' style={ style }>
        <div className='layer w-100 mB-10'>
          <h6 className='lh-1'>{ title }</h6>
        </div>
        <div className='layer w-100'>
          { children }
        </div>
      </div>
    )
  }
}

export default ContainmentWidget;