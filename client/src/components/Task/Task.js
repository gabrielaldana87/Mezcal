import React , { Component } from 'react';

class Task extends Component {
  constructor (props) {
    super (props);
    this.state = {
    }
  }
  ;
  render () {
    const { id , header, time } = this.props;
    return (
      <p id ={ id } >
        <strong>{ header }</strong>
        <br></br>{ time }<br></br>
      </p>
    )
  }
}

export default Task;