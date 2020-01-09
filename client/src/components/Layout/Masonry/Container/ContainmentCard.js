import React, { Component } from 'react';

class ContainmentCard extends Component {
  render(){
    const { children, title } = this.props;
    return(
      <div className='peer peer-greed w-80p@lg+ w-100@lg- p-20'>
        <div className='layers'>
          <div className='layer w-100 mB-10'>
            <h6 className='lh-1'>{ title }</h6>
          </div>
          <div className='layer w-100'>
            { children }
          </div>
        </div>
      </div>
    )
  }
}

export default ContainmentCard;