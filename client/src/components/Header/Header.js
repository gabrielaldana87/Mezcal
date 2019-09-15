import React, { Component } from 'react';
import './Header.scss';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
    ;
  }  componentDidMount () {
    fetch('/api/user')
      .then(res => res.json())
      .then(user => this.setState(mapStateToProps({user})) )
  }
  render = () => {
    const { user } = this.state;
    return (
      <div className='header navbar'>
        <div className='header-container'>
          <ul className='nav-right'>
            <li className='dropdown'>
              <a href='' className='dropdown-toggle no-after peers fxw-nw ai-c lh-1' dataToggle='dropdown'>
                <div className='peer mR-10'>
                  <img className='w-2r bdrs-50p' src={user.imageUrl} alt=''/>
                </div>
                <div className='peer'>
                  <span className='fsz-sm c-grey-900'>{user.displayName}</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({user}) => ({user});

export default Header;