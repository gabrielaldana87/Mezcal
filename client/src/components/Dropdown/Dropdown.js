import React , { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { fetchGoal } from '../../actions/goals';
import './Dropdown.scss';

class Dropdown extends Component {
  constructor (props) {
    super (props);
    this.state = {
      options:[],
      selectedOption: null
    }
  }
  ;
  handleChange = selectedOption => {
    const { taskId , card, dispatch }  = this.props;
    let message = {
      categoryId: card._id,
      categoryName: card.name,
      selectedOption : selectedOption.value,
      ...card.tasks.find(o => o.id === taskId)
    };
    dispatch(fetchGoal(message));
    this.setState({ selectedOption : selectedOption });
  }
  ;
  componentDidMount () {
    const { label_id } = this.props;
    fetch(`/api/goals_class/${ label_id }`)
      .then( res => res.json())
      .then( category => this.setState({ options: category[0].goals.map(o => {
        return { value: o.goal_name , label: o.goal_name }
      })}))
  }
  ;
  render () {
    const { options, selectedOption } = this.state;
    let goal = selectedOption ? selectedOption : this.props.selectedOption;
    return (
      <div className='selection-goals-options'>
        <Select
          value={ goal }
          options= { options }
          onChange= { this.handleChange }
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { selectedOption: state.goal.data }
};

export default connect(mapStateToProps)(Dropdown);