import React , { Component } from 'react';
import ListItem from './ListItem';
import './List.scss';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newLabel: ''
    }
  }
  ;
  onItemClick (evt) {
    const { id, list, onListChange } = this.props;
    const clickedId = evt.target.value;
    const newList = list.map(item => {
      if (item.id !== clickedId) return item;
      return {
        ...item,
        isDone: !item.isDone
      };
    });
  }
  ;
  render () {
    const { name , list } = this.props;
    return (
      <div className='list__container'>
        <div className='list__header'>
          <div className='list__name'>
            { name }
          </div>
        </div>
        <div className='list__items'>
          {
            list.length === 0
              ? 'Add some todos'
              : list.map( item => (
                <ListItem
                  {...item}
                  key={item.id}
                  onClick={this.onItemClick}
                  onClickDelete={this.onItemDelete}
                />
            ))
          }
        </div>
      </div>
    )
  }
}

export default List;