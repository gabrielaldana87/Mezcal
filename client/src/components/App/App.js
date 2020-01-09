import React from 'react';
import logo from '../../logo.svg';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import Home from '../Home/Home';
import PageContainer from '../PageContainer/PageContainer';
import SideBar from '../Sidebar/Sidebar';
import Board from '../Board/Board';
import Portfolio from '../Portfolio/Portfolio';
import Subway from '../Chart/Subway';
import Census from '../Projects/Census/Census';
import Goals from '../Goals/Goals';
import './App.css';

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={ Home } />
      <Route path='/board'  children={ <Home><Board/></Home> } />
      <Route path='/calendar' children={ <Home/> } />
      <Route path='/notes' component={ Home } />
      <Route path='/goals' children={ <Home><Goals/></Home> } />
      <Route path='/visualizations' children={ <Home><Portfolio/></Home> } />
      <Route path='/subway' children={ <Home><Subway/></Home> } />
      <Route path='/discovery' children={<><SideBar/><PageContainer><Census/></PageContainer></> } />
    </Switch>
  );
};

export default App;
