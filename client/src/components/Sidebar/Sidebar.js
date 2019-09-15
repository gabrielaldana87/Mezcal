import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Sidebar.scss';

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }
  ;
  render = () => {
    return (
      <>
      <div className='sidebar'>
        <div className='sidebar-inner'>
          <div className='sidebar-logo'>
            <div className='peers ai-c fxw-nw'>
              <div className='peer peer-greed'>
                <a className='sidebar-link td-n' href='/'>
                  <div className='peers ai-c fxw-nw'>
                    <div className='peer'>
                      <div className='logo'>
                      </div>
                    </div>
                    <div className='peer peer-greed'>
                      <h5 className='lh-1 mB-0 logo-text'></h5>
                    </div>
                  </div>
                </a>
              </div>
              <div className='peer'>
                <div className='mobile-toggle sidebar-toggle'>
                  <a href='' className='td-n'>
                    <i className='ti-arrow-circle-left'></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <ul className='sidebar-menu scrollable pos-r'>
          </ul>
        </div>
      </div>
      </>
    )
  }
}

export default Sidebar;