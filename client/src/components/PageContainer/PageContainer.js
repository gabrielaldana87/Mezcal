import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Board from '../Board/Board';
import Portfolio from '../Portfolio/Portfolio'

import './PageContainer.scss';


class PageContainer extends Component {
  constructor(props) {
    super(props);
  }
  ;
  render = () => {
    const { children } = this.props;
    return (
      <div className='page-container'>
        <main className='main-content bgc-grey-100'>
          <div id='mainContent'>
            { children }
          </div>
        </main>
      </div>
      );
  }
}

export default PageContainer;