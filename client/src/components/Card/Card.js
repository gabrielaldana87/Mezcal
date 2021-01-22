import React, { Component, ReactDOM } from 'react';
import PropTypes from 'prop-types';
import  { connect } from 'react-redux';
import Task from '../Task/Task';
import Status from '../Status/Status';
import TaskModal from '../TaskModal/TaskModal';
import classnames from 'classnames';
import { fetchGoalSelection } from '../../actions/goals';
// import formatMarkdown from './formatMarkdown';
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
  toggleCardEditor = () => {
    this.setState({isModalOpen: !this.state.isModalOpen });
  }
  ;
  handleClick  = event => {
    const { dispatch } = this.props;
    const { tagName } = event.target;
    if (tagName.toLowerCase() === 'p') {
      this.paragraph = event.target;
      this.toggleCardEditor(event);
      dispatch(fetchGoalSelection(event.target.id));
    }
  }
  ;
  render () {
    const { card, listId, squares } = this.props;
    const { isModalOpen } = this.state;
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
          >
            <h3> { card.name } </h3>
            { card.tasks.map(task =>
              <>
                <Task { ...task } key={ task.id }/>
                <TaskModal
                  isOpen={isModalOpen}
                  cardElement={this.paragraph}
                  color={card.color}
                  background={card.background}
                  card={card}
                  note={ task.note }
                  listId={listId}
                  toggleCardEditor={this.toggleCardEditor}
                />
              </>
            ) }
          </div>
          { schedule ? <Status
            status={ schedule.completion.sort() }
            listId={ listId }
            background = { card.color }
          /> : null }
        </div>

      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    card: ownProps.card,
    listId: ownProps.listId,
    squares: state.status.data
  }

};


export default connect(mapStateToProps)(Card);