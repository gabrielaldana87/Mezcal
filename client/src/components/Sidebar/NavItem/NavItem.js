import React, { Component } from 'react';
import './NavItem.scss';
import { Link } from "react-router-dom";

class NavItem extends Component {
  constructor(props) {
    super(props);
  }
  ;
  render () {
    return(
      <li className='nav-item mT-30 active'>
        <Link to={'/board'}>
          <a className='sidebar-link'>
          <span className='icon-holder'>
            <i className='c-light-blue-500 ti-clipboard'>
            </i>
          </span>
            <span className='title'>Board</span>
          </a>
        </Link>
        <Link to={'/calendar'}>
          <a className='sidebar-link'>
          <span className='icon-holder'>
            <i className='c-light-blue-500 ti-calendar'>
            </i>
          </span>
            <span className='title'>Calendar</span>
          </a>
        </Link>
        <Link to={'/notes'}>
          <a className='sidebar-link'>
          <span className='icon-holder'>
            <i className='c-light-blue-500 ti-book'>
            </i>
          </span>
            <span className='title'>Notes</span>
          </a>
        </Link>
        <Link to={'/goals'}>
          <a className='sidebar-link'>
          <span className='icon-holder'>
            <i className='c-light-blue-500 ti-check-box'>
            </i>
          </span>
            <span className='title'>Goals</span>
          </a>
        </Link>
        <Link to={'/visualizations'}>
          <a className='sidebar-link'>
          <span className='icon-holder'>
            <i className='c-light-blue-500 ti-gallery'>
            </i>
          </span>
            <span className='title'>Visualizations</span>
          </a>
        </Link>
      </li>
    )
  }
}

export default NavItem;