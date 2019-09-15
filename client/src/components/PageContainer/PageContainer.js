import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Board from '../Board/Board';
import Header from '../Header/Header';
import Protocol from '../Protocol/Protocol';
import './PageContainer.scss';


class PageContainer extends Component {
  constructor(props) {
    super(props);
  }
  ;
  render = () => {
    return (
      <div className='page-container'>
        <Header/>
        <main className='main-content bgc-grey-100'>
          <div id='mainContent'>
            {/*<Protocol/>*/}
            <Board/>
          </div>
        </main>
      </div>
      );
  }
}

export default PageContainer;