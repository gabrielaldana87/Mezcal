import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Title } from 'react-head';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import PageContainer from '../PageContainer/PageContainer';
import SideBar from '../Sidebar/Sidebar';
import { fetchUser } from '../../actions/user';
import './Home.scss';

class Home extends Component {
  componentDidMount () {
    this.props.dispatch(fetchUser())
  }
  ;
  render = () => {
    const { children , user } = this.props;
    return (
      <>
      <Header { ... user }/>
      <SideBar/>
      <PageContainer children={ children }/>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
  loading: state.user.loading,
  error: state.user.error
});

export default connect(mapStateToProps)(Home);