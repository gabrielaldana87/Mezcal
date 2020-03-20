import React, { Component } from 'react';
import './Header.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {

  render = () => {
    const { displayName , imageUrl } = this.props;
    return (
      <div className='header navbar'>
        <div className='header-container'>
          <ul className='nav-right'>
            <li className='dropdown'>
              <a href='' className='dropdown-toggle no-after peers fxw-nw ai-c lh-1' dataToggle='dropdown'>
                <div className='peer mR-10'>
                  <img className='w-2r bdrs-50p' src={ imageUrl } alt=''/>
                </div>
                <div className='peer display-name'>
                  <span className='fsz-sm c-grey-900'>{ displayName }</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Header);