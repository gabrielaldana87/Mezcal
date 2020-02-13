import React , { Component } from 'react';
import Select from 'react-select';
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
    console.log(selectedOption)
  }
  ;
  componentDidMount () {
    const { label_id } = this.props;
    fetch(`/api/goals/${ label_id }`)
      .then( res => res.json())
      .then( category => this.setState({ options: category[0].goals.map(o => {
        return { value: o.goal_name , label: o.goal_name }
      })}))
  }
  ;
  render () {
    const { options , selectedOption } = this.state;
    return (
      <div className='selection-goals-options'>
        <Select
          value={ selectedOption }
          options= { options }
          onChange= { this.handleChange }
        />
      </div>
    )
  }
}

export default Dropdown;