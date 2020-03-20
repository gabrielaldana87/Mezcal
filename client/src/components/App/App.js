import React from 'react';
import logo from '../../logo.svg';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Site from '../Site/Site';
import './App.css';

const App = ({ user }) => {
  return <Site />
};

const mapStateToProps = state => { console.log(state);  return { user: state.user } } ;
export default withRouter(connect(mapStateToProps)(App));
