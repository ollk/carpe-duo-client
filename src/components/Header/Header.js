import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';

export default class Header extends Component {

  handleLogoutClick = () => {
    TokenService.clearAuthToken()
    this.forceUpdate()
  }

  renderLogoutLink() {
    return (
      <div className='Header_logout'>
        <Link onClick={this.handleLogoutClick} to='/'>
          Logout
        </Link>
      </div>
    )
  }


  render() {
    return <>
      <nav className='Header'>
        <h1>
          <Link to='/'>
            Carpe Duo
          </Link>
        </h1>
        <span className='Header_tagline'>Seize the Weekend</span>
        {TokenService.hasAuthToken() && this.renderLogoutLink()}
      </nav>
    </>
  }
}