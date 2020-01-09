import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ListHeader from './ListHeader';
import Cards from './Cards';
import ButtonClick from '../Toolkit/ButtonClick';
import './List.scss';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  ;
  render = () => {
    const { list, boardId } = this.props;
    return (
     <>
      <div className='list-wrapper'>
        <div className={classnames('list')}>
          <div className='header-wrap'>
            <ListHeader
              listTitle={list.title}
              listId={list._id}
              cards={list.cards}
              boardId={boardId}
            />
            <ButtonClick
            />
          </div>
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