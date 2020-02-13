import React, { Component, ReactDOM } from 'react';
import PropTypes from 'prop-types';
import Status from '../Status/Status';
import CardModal from '../CardModal/CardModal';
import classnames from 'classnames';
import formatMarkdown from './formatMarkdown';
import './Card.scss';
import * as _ from 'underscore';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: [],
      active: true,
      isModalOpen: false
    }
    ;
  }
  ;
  componentDidMount () {
    fetch('/api/categories')
      .then(res => res.json())
      .then(squares => { this.setState(squaresToCard(squares)) })
  }
  ;
  toggleCardEditor = () => {
    this.setState({isModalOpen: !this.state.isModalOpen });
  }
  ;
  handleClick (event) {
    const { tagName } = event.target;
    if (tagName.toLowerCase() === 'p') {
      console.log(event.target)
      this.paragraph = event.target;
      this.toggleCardEditor(event);
    }
  }
  ;
  render () {
    const { card, index, listId , key } = mapStateToProps(this.props);
    const { isModalOpen } = this.state;
    const squares = this.state.squares;
    const schedule = _.find(squares, o => o.id === card._id );
    return (
      <>
        <div
          className={classnames('card-title', {
            'card-title--drag': false
          })}
          onClick={event => {
            this.handleClick(event);
          }}
          style={{
            background: card.background,
            color: card.color
          }}
        >
          <div
            className='card-title-html'
            ref={ ref => {
              this.ref = ref;
            }}
            dangerouslySetInnerHTML={{
              __html: formatMarkdown(`${card.text}`)
            }}
          />
          { schedule ? <Status
            status={ schedule.completion.sort() }
            listId={ listId }
            background = { card.color }
          /> : null }
        </div>
        <CardModal
          isOpen={isModalOpen}
          cardElement={this.paragraph}
          color={card.color}
          background={card.background}
          card={card}
          listId={listId}
          toggleCardEditor={this.toggleCardEditor}
        />
      </>
    )
  }
}

const mapStateToProps = state => ({
  listId: state.listId,
  card: state.cardId
});

const squaresToCard = state => {
  const squares = state;
  return {
    squares: squares
  }
};

export default Card;