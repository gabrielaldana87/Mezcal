import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import List from '../List/List';
import './Board.scss';

class Board extends Component {
  constructor(props) {
   super(props);
    this.state = {
      lists: []
    }
  }
  ;
  componentDidMount () {
    fetch('/api/boards')
      .then(res => res.json() )
      .then(boards => this.setState(mapStateToProps( boards )) );
  }
  ;
  render = () => {
    const  { lists, boardTitle, boardId, boardColor } = this.state;
    return (
      <>
        <div className={classnames('board', boardColor)}>
          <title>{boardTitle}</title>
          <div className='lists-wrapper'>
            <div className="lists">
              {lists.map((list, index) => (
                <List
                  list={list}
                  boardId={boardId}
                  index={index}
                  key={list._id}
                />
              ))}
            </div>
          </div>
        </div>
        <div className='board-underlay'>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  const  board  = state;
  return {
    lists: board.lists,
    boardTitle: board.title,
    boardColor: board.color,
    boardId: board._id
  }
};

export default Board;
