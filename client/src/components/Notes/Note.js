import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Note.scss'
import { writeNote } from '../../actions/note';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteText: props.noteText,
      isOpen: false
    }
    ;
    //this.onChange = this.onChange.bind(this);
  }
  ;
  onChange = evt => {
    this.setState({noteText: evt.target.value });
  }
  ;
  componentWillReceiveProps = nextProps => {
    this.setState({ noteText: nextProps.noteText })
  }
  ;
  handleKeyDown = evt => {
    if ( evt.keyCode === 13 ) {
      evt.preventDefault();
      this.handleSubmit();
    } else if ( evt.keyCode === 27) {
      this.revertNoteText();
    }
  }
  ;
  handleSubmit = evt => {
    evt.preventDefault();
    const { noteText } = this.state;
    const { dispatch, userId, categoryId, msgId, taskName, time, statusId, statusName } = this.props;
    if ( noteText === '' ) return;
    dispatch(writeNote({ userId, categoryId, msgId, taskName, time, statusId, statusName, noteText }));
    this.setState({isOpen : false});
  }
  ;
  revertNoteText = () => {
    this.setState({ noteText: this.props.noteText });
  }
  ;
  openNoteEditor = () => {
    this.setState({ isOpen: true });
  }
  ;
  handleButtonKeyDown = evt => {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      this.openNoteEditor();
    }
  }
  ;
  render () {
    const { isOpen , noteText } = this.state;
    const {
      boundingRect,
      background,
      color,
      card
    } = this.props
    ;
    return (
      <div className='bgc-white p-20 bd' style={{ backgroundColor:background }}>
        <h6 className='c-grey-900'></h6>
        <div className='mT-30'>
            <form
              onSubmit={ this.handleSubmit }>
              <div className='form-group' style={{color: color}}>
                <label>Paragraph</label>
                <textarea
                  onChange={ this.onChange }
                  type='paragraph'
                  className='form-control'
                  id='exampleInputParagraphName'
                  aria-describedby='paragraphHelp'
                  placeholder='Enter Text'
                  value={ noteText }
                />
              </div>
              <button
                type='submit'
                className='btn btn-primary'
              >Submit
              </button>
            </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, prevProps) => {
  const { title, cards } = state.board.data.lists.find(o => o._id === prevProps.listId );
  const { tasks } = cards.find(o => o._id == prevProps.card._id);
  const task = tasks.find(o => o.id === prevProps.task.id );
  return {
    userId : state.user.data._id,
    msgId: task.id,
    taskName: task.header,
    time: task.time,
    // noteText: '',
    statusId: prevProps.listId,
    statusName: title,
    categoryId: prevProps.card._id
  }
};

export default connect(mapStateToProps)(Note);