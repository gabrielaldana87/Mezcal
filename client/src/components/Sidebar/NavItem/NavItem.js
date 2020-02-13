import React, { Component } from 'react';
import './NavItem.scss';
import { Link } from "react-router-dom";
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import menuOptions from '../menuOptions';

class NavItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  ;
  handleClick (item) {
    this.setState( prevState => (
    { [ item ]: !prevState[ item ]}
    ));
  }
  ;
  handler (children) {
    const { state } = this;
    return children.map ( subOption => {
      const iconClass = `c-light-blue-500 ${subOption.icon}`;
      if ( !subOption.children ) {
        return (
          <Link to={ subOption.url }>
            <a className='sidebar-link'>
              <span className='icon-holder'>
                <i className={ iconClass }></i>
              </span>
              <span className='title'>{ subOption.title }</span>
            </a>
          </Link>
        )
      }
      return (
        <ListItem
          style={{paddingLeft: '25px'}}
          button
          onClick={ () => this.handleClick( subOption.title ) }
        >
          <a className='sidebar-link inner'>
            <span className='icon-holder'>
              <i className={ iconClass }></i>
            </span>
            <span className='title'>{ subOption.title }</span>
            <Collapse
              in={ state[subOption.title] }
              timeout='auto'
              unmountOnExit
            >
              { this.handler (subOption.children )}
            </Collapse>
          </a>
        </ListItem>
      )
    })
  }
  ;
  render () {
    return(
      <li className='nav-item mT-30 active'>
        { this.handler(menuOptions.data) }
      </li>
    )
  }
}

export default NavItem;