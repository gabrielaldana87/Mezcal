import React from 'react';
import logo from '../../logo.svg';
// import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import Home from '../Home/Home';
import Sidebar from '../Sidebar/Sidebar';
import PageContainer from '../PageContainer/PageContainer';
import './App.css';

const App = () => {
  return (
    <>
    <Sidebar/>
    <PageContainer/>
    </>
  );
};

export default App;
