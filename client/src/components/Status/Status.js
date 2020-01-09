import React, { Component } from 'react';
import './Status.scss';

const Square = prop => {
  const border = () => { if (prop.id === 'Label_7437376097989230949' ||
  prop.id === 'Label_550790012261636894' ) return null };
  const background = () => prop.id === 'Label_7437376097989230949' ? null : null ;
  return  (
    <div className="btn-group mr-2"
         role="group"
         aria-label="First group"
    >
      <button
        title={ prop.message }
        type="button"
        className={ prop.className }
        style={{ borderColor: border() , backgroundColor: background() }}
      >-</button>
    </div>
  )
};

class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: []
    }
  }
  ;
  render = () => {
    const { squares, color, hours } = mapStateToProps(this.props);
    return (
      <div className='btn-toolbar' role='toolbar' aria-label='Toolbar with button groups'>
        {squares.map( obj  => {
          let className = `btn btn-secondary ${obj.key}`;
          return <Square
            className = { className }
            id = { obj.key }
            color= { color }
            message= { obj.snippet }
          />
        })}
        <span className='time-span'> { hours } </span>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  squares: state.status,
  hours: state.status.map( o =>
    o.key == state.listId ? o.duration : 0
  ).reduce((a, b) => a + b),
  color: state.background
});


export default Status;