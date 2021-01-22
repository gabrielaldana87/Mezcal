import React,  { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Note from '../Notes/Note';
import Dropdown from '../Dropdown/Dropdown';
import './TaskOptions.scss';

class TaskOptions extends Component {
  static propTypes = {
    isNotePadEditOpen: PropTypes.bool.isRequired,
    card: PropTypes.shape({ _id: PropTypes.string.isRequired }).isRequired,
    isCardNearRightBorder: PropTypes.bool.isRequired,
    isThinDisplay: PropTypes.bool.isRequired,
    boundingRect: PropTypes.object.isRequired,
    toggleNotePadPicker: PropTypes.func.isRequired
  }
  ;
  constructor (props) {
    super(props);
    this.state = {
    }
  }
  ;
  handleKeyDown = event => {
    if (event.keyCode === 27) {
      this.props.toggleNotePadPicker();
      this.notePadPickerButton.focus();
    }
  }
  ;
  render () {
    const {
      isCardNearRightBorder,
      isNotePadEditOpen,
      isCalendarIconOpen,
      toggleNotePadPicker,
      card,
      task,
      listId,
      noteText,
      color,
      background,
      isThinDisplay,
      boundingRect
    } = this.props
    ;
    return(
      <div
        className='options-list'
        style={{
          alignItems: isCardNearRightBorder ? 'flex-end' : 'flex-start'
         }}
      >
        <div className='modal-notepad-picker-wrapper'>
          <button
            className='options-list-button'
            onClick={ toggleNotePadPicker }
            onKeyDown={ this.handleKeyDown }
            style={{color: color}}
            ref={ ref => {
              this.notePadPickerButton = ref;
            }}
            aria-haspopup
            aria-expanded={ isNotePadEditOpen }
          >
            <i className='c-light-blue-500 ti-book'></i>
          &nbsp;Notes
        </button>
        <Dropdown
          label_id={ card._id }
          card={ card }
          taskId={ task.id }
        />
        {isNotePadEditOpen && (
          <div
            className='modal-notepad-picker'
            onKeyDown={ this.handleKeyDown }
            style={{
              width: boundingRect.width + 32
            }}
          >
            <Note
              boundingRect={ boundingRect }
              background={ background }
              color={ color }
              noteText={ noteText }
              card={ card }
              task={ task }
              listId={ listId }
              />
          </div>
        )
        }
        </div>
      </div>
    )
  }
}

export default connect()(TaskOptions);