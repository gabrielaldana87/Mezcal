import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Status from '../Status/Status';
import classnames from 'classnames';
import formatMarkdown from './formatMarkdown';
import './Card.scss';
import * as d3 from 'd3';

class Card extends Component {
  constructor() {
    super();
    this.state = {
      card: []
    }
  }
  onClick (evt) {
    d3.selectAll('p').style('display','none');
  }
  ;
  render () {
    const { card, index, listId } = mapStateToProps(this.props);
    console.log(formatMarkdown(card.text))
    return (
      <>
        <div
          className={classnames('card-title', {
            'card-title--drag': false
          })}
          style={{
            background: card.background,
            color: card.color
          }}
        >
          <div
            className="card-title-html"
            onClick={this.onClick}
            dangerouslySetInnerHTML={{
              __html: formatMarkdown(`${card.text}`)
            }}
          />
          <Status/>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  card: state.cardId
});

export default Card;