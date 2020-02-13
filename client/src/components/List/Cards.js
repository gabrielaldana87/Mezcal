import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';

class Cards extends Component {
  static propTypes = {
    listId: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.string).isRequired
  }
  ;
  render() {
    const { listId, cards } = this.props;
    return (
      <>
        <div className='cards'>
          {cards.map((cardId, index) => (
            <Card
              key={cardId._id}
              cardId={cardId}
              index={index}
              listId={listId}
            />
          ))}
          <div
            style={{float: 'left', clear: 'both'}}
          ></div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {cards: state.cards}
};

export default Cards;