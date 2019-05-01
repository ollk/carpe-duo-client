import React, { Component } from 'react';

export default class Registration extends Component {





  render() {
    return (
      <>
        <h2>Create New Account</h2>
        <form className='RegistrationForm'>
          <div className='first-name'>
            <label htmlFor='RegistrationForm-first-name'>
              First Name
            </label>
            <input 
              required
              type='text'
              name='first-name'
              id='RegistrationForm-first-name'
            />
          </div>
          <div className='user-name'>
            <label htmlFor='RegistrationForm-user-name'>
              Username
            </label>
            <input 
              required
              type='text'
              name='user-name'
              id='RegistrationForm-user-name'
            />
          </div>
          <div className='password'>
            <label htmlFor='RegistrationForm-password'>
              Password
            </label>
            <input 
              required
              type='text'
              name='password'
              id='RegistrationForm-password'
            />
          </div>
          <input
            type='submit'
            value='Register'
          />
        </form>
      </>
    )
  }
}