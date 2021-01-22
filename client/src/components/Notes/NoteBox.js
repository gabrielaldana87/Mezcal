import React , { Component } from 'react';
import { connect } from 'react-redux';
import TaskBar from './TaskBar';
import { modifyTaskNote } from '../../actions/note';

class NoteBox extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }
  ;
  render () {
    const { pTags, msgId } = this.props;
    return (
      <div className='note-text-box'>
        { pTags.map(o => (typeof o === 'string') ?
        <p className='task-text'> { o }</p> :
          <TaskBar
            task={ o.task }
            msgId={ msgId }
          />
        )}
      </div>
    )
  }
}

export default connect()(NoteBox);