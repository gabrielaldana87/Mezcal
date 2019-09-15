import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Title } from 'react-head';
import Header from '../Header/Header';
import './Home.scss';

class Home extends Component {
  state = {
    boards: []
  }
  // static propTypes = {
  //   boards : PropTypes.arrayOf(
  //     PropTypes.shape({
  //       _id: PropTypes.string.isRequired,
  //       color: PropTypes.string.isRequired,
  //       title: PropTypes.string.isRequired
  //     })
  //   )
  // }
  ;
  componentDidMount() {
    fetch('/api/boards')
      .then(res => res.json())
      .then(boards => this.setState({ boards }));
  }
  ;
  render = () => {
    const boards = this.state.boards;
    return (
      <>
      {/*<Title>Home | Gabriel's Google Kanban </Title>*/}
      <Header />
      <div className='home'>
        <div className='main-content'>
          <h1>Boards</h1>
          <div className='boards'>
            {
              boards.map(board => (
                <>
                <div className='board-link-title'>{Object.keys(board)}</div>
                <div className='mini-board'>
                  {
                    board[Object.keys(board)].map(listId => (
                      <p>{listId.value.data.snippet}</p>
                    ))
                  }
                </div>
               </>
              ))
            }
          </div>
        </div>
      </div>
      </>
    )
  }
}

export default Home;