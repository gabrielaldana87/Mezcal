import React, { Component } from 'react';
import List from './List';

class Goals extends Component {
  constructor (props) {
    super(props);
    this.state = {
      newListName: '',
      lists: []
    }
  }
  ;
  componentDidMount () {
    fetch('./data/goals.json')
      .then(res => res.json() )
      .then(goal => this.setState({lists: goal.lists }))
  }
  ;
  render () {
    const { lists, newListName } = this.state;
    return (
      <>
        <div className='app__listControls'>
          <input
          placeholder='new list name'
          value={ newListName }
          onChange={ this.onNewListNameChange }
          />
          <button
            onClick={ this.onNewListCreate }
          >
            Create List
          </button>
        </div>
        <div className='app__lists'>
          {
            lists.length === 0
              ? 'Create a List'
              : lists.map(list => (
                <List
                  {...list}
                  key={list.id}
                  onListChange={this.onListChange}
                  onDeleteList={this.onDeleteList}
                />
              )
            )
          }
        </div>
      </>
    )
  }
}

export default Goals;