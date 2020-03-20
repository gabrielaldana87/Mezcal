import React , { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from '../Home/Home';
import Notes from '../Notes/Notes';
import PageContainer from '../PageContainer/PageContainer';
import SideBar from '../Sidebar/Sidebar';
import Board from '../Board/Board';
import Portfolio from '../Portfolio/Portfolio';
import Subway from '../Chart/Subway';
import Census from '../Projects/Census/Census';
import Goals from '../Goals/Goals';
import { fetchBoard } from '../../actions/board';

class Site extends Component {

  componentDidMount () {

    this.props.dispatch(fetchBoard());

  }
  ;
  render () {
    const { board } = this.props;
    return (
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route path='/board'  children={ <Home><Board { ...board } /></Home> } />
        <Route path='/calendar' children={ <Home/> } />
        <Route path='/notes' children={ <Home><Notes/></Home> } />
        <Route path='/goals' children={ <Home><Goals/></Home> } />
        <Route path='/visualizations' children={ <Home><Portfolio/></Home> } />
        <Route path='/subway' children={ <Home><Subway/></Home> } />
        <Route path='/discovery' children={<><SideBar/><PageContainer><Census/></PageContainer></> } />
      </Switch>
    )
  }
  ;
}

const mapStateToProps = state => ({
  board: state.board.data,
  loading: state.board.loading,
  error: state.board.error
});

export default connect(mapStateToProps)(Site);