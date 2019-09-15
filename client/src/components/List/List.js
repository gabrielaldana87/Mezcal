import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ListHeader from './ListHeader';
import Cards from './Cards';
import './List.scss';

class List extends Component {
  render = () => {
    const { list, boardId } = this.props;
    return (
     <>
      <div className='list-wrapper'>
        <div className={classnames('list')}>
          <ListHeader
            listTitle={list.title}
            listId={list._id}
            cards={list.cards}
            boardId={boardId}
          />
          <div className='cards-wrapper'>
            <Cards listId={list._id} cards={list.cards}/>
          </div>
        </div>
      </div>
     </>
    )
  }
}

export default List;