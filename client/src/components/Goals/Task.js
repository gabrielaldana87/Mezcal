import React , { Component } from 'react';
import './Task.scss';

class Task extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  ;
  render () {
    const { id , label , iDone } = this.props;
    return (
      <div className='task'>
        <p>
          { label }
        </p>
      </div>
    )
  }
}

export default Task;