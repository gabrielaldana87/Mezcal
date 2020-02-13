import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Note.scss'

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newText: []
    }
    ;
    this.onChange = this.onChange.bind(this);
  }
  ;
  onChange (evt) {
    this.setState({newText: evt.target.value });
  }
  ;
  componentWillReceiveProps = nextProps => {
    this.setState({ newText: nextProps.card.text })
  }
  ;
  handleKeyDown = evt => {
    if (evt.keyCode === 13 && evt.shiftKey === false) {
      evt.preventDefault();
      this.handleSubmit();
    }
  }
  ;
  handleSubmit = evt => {
    evt.preventDefault();
    const { newText } = this.state;
    const { card, dispatch } = this.props;
    if ( newText === '' ) return;
    const cardId = card._id;
    dispatch({
      type: 'ADD_NOTE',
      payload: { noteText: newText, cardId }
    });
    // this.setState({newText: ''});
  }
  ;
  render () {
    const {
      boundingRect,
      background,
      color,
      card
    } = this.props
    ;
    return (
      <div className='bgc-white p-20 bd' style={{backgroundColor:background }}>
        <h6 className='c-grey-900'></h6>
        <div className='mT-30'>
          <form
            onSubmit={ this.handleSubmit }>
            <div className='form-group'style={{ color: color }}>
              <label>Paragraph</label>
              <textarea
                onChange={ this.onChange }
                type='paragraph'
                className='form-control'
                id='exampleInputParagraphName'
                aria-describedby='paragraphHelp'
                placeholder='Enter Text'>
              </textarea>
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

export default connect()(Note);