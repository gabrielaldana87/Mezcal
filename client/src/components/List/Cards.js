import React, { Component } from 'react';
import { connect } from 'react-redux';
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
          {cards.map((cardId, index) => {
           return <Card
            key={ `${ cardId._id }-${ listId }` }
            card={ cardId }
            index={ index }
            listId={ listId }
              />
            }
          )}
          <div
            style={{float: 'left', clear: 'both'}}
          ></div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {cards: state.cards}
};

export default connect()(Cards);