import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  render = () => {
    const  { lists, boardTitle, boardId, boardColor } = this.props;
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
  const  { board } = state;
  return {
    lists: board.data.lists,
    boardTitle: board.data.title,
    boardColor: board.data.color,
    boardId: board.data._id
  }
};

export default connect(mapStateToProps)(Board);
