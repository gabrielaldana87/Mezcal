import React , { Component } from 'react';
import { connect } from 'react-redux';
import { modifyTaskNote } from '../../actions/note';
import xmlToJson from './xmlToJSON';


class TaskBar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isComplete : false
    }
  }
  ;
  onClick  = () => {
    const
      { task , msgId, dispatch } = this.props,
      message = Object.assign({ task: task, isComplete: !this.state.isComplete }, { msgId: msgId } )
    ;
    dispatch(modifyTaskNote(message));
    this.setState({ isComplete: !this.state.isComplete });

  }
  ;
  render () {
    const barText = this.props;
    const { isComplete } = this.state;
    return isComplete ? null : (
      <div className='task-info'>
        <p className='task-text'> { barText.task }</p>
        <button
          type='submit'
          className='btn btn-primary'
          onClick={ this.onClick }
        >Done
        </button>
        <button
          type='submit'
          className='btn btn-primary'
        >Schedule
        </button>
      </div>
    )
  }
}

export default connect()(TaskBar);