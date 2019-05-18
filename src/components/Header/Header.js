import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import './Header.css';
import IdleService from '../../services/idle-service';

export default class Header extends Component {

  handleLogoutClick = () => {
    TokenService.clearAuthToken()
    TokenService.clearUserId()
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()

    //necessary?
    this.forceUpdate()
  }


  renderNavLinks() {
    return (
      <div className='Header_nav_links'>
        <Link to='/Tasks/New' className='nav-link'>
          Create New Task
        </Link>
        <Link to='/Tasks/Sleep' className='nav-link mid'>
          Change Waking Hours
        </Link>
        <Link onClick={this.handleLogoutClick} to='/' className='nav-link'>
          Logout
        </Link>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='Header_login'>
        <Link to='/Login' className='nav-link'>
          LogIn
        </Link>
      </div>
    )
  }
  

  render() {
    return <>
      <nav className='Header'>
        <div className='head-tag-div'>
          <h1>
            <Link to='/' className='Home-link'>
              Carpe Duo
            </Link>
          </h1>
        <p className='Header_tagline'>Seize the Weekend</p>
        </div>
        {TokenService.hasAuthToken() 
          ? this.renderNavLinks()
          : this.renderLoginLink()
        }
      </nav>
    </>
  }
}