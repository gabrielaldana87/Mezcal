import React , { Component } from 'react';
import classnames from 'classnames';
import './ListItem.scss';
import Task from './Task';

class ListItem extends Component {
  render () {
    const { id, label, isDone, tasks, onClick, onClickDelete } = this.props;
    console.log(tasks)
    return (
      <div className='listItem__container'>
        <span className={classnames('listItem__label', ( isDone ? 'listItem__label__done' : '' )
        )}
        >
          {label}
        </span>
        <div className='taskItem__container'>
          {
            tasks.length === 0
            ? 'Add some tasks'
            : tasks.map(task => (
              <Task
                {...task}
                key={task.id}
              />
            ))
          }
        </div>
      </div>
    )
  }
}

export default ListItem;