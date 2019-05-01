import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LandingPage extends Component {
  render() {
    return (
      <>
        <header role='banner'>
          <h1>Carpe Duo</h1>
          <p>Seize the Weekend!</p>
        </header>

        <section>
          Welcome to Carpe Duo, an app designed to help you plan a productive, guilt free weekend!
          <br/>
          To get started, click the link below to sign up, or login if you're already registererd. 
        </section>

        <Link to='/register'>
          Create New Account
        </Link>

        <form className='LoginForm'>
          <div className='user-name'>
            <label htmlFor='LoginForm-user-name'>
              User name
            </label>
            <input 
              required 
              type='text'
              name='user-name' 
              id='LoginForm-user-name'
            />
          </div>
          <div className='password'>
            <label htmlFor='LoginForm-password'>
              Password
            </label>
            <input 
              required 
              type='text'
              name='password' 
              id='LoginForm-password'
            />
          </div>
          <input
            type='submit'
            value='Login'
          />
        </form>


      </>
    )
  }
}