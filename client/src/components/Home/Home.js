import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Title } from 'react-head';
import PageContainer from '../PageContainer/PageContainer';
import SideBar from '../Sidebar/Sidebar';
import './Home.scss';

class Home extends Component {
  render = () => {
    const { children } = this.props;
    return (
      <>
      <SideBar/>
      <PageContainer children={ children }/>
      </>
    )
  }
}

export default Home;