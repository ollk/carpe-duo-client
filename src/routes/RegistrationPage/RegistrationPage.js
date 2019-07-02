import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import {Link} from 'react-router-dom';
import Header from '../../components/Header/Header';
import './RegistrationPage.css';

export default class Registration extends Component {


  state = {error: null}

  handleSubmit = event => {
    event.preventDefault()
    const {first_name, user_name, password} = event.target

    this.setState({error: null})
    AuthApiService.postUser({
      first_name: first_name.value,
      user_name: user_name.value,
      password: password.value
    })
      .then(user => {
        first_name.value = ''
        user_name.value = ''
        password.value = ''
        this.props.history.push('/Login') 
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
    }



  render() {
    const {error} = this.state
    return (
      <>
        <Header />

        <div className='registration-box'>
          <h1>Sign Up</h1>
          <p className='already'>
            Already have a Carpe Duo account?<Link to='/Login' className='login-link'> Log In</Link>
          </p>
          <form className='RegistrationForm' onSubmit={this.handleSubmit}>
            <div role='alert'>
              {error && <p className='red'>{error}</p>}
            </div>
            <div className='first_name'>
              <label htmlFor='RegistrationForm-first_name'>
                FirstName
              </label>
              <input 
                required
                type='text'
                name='first_name'
                id='RegistrationForm-first_name'
              />
            </div>
            <div className='user_name'>
              <label htmlFor='RegistrationForm-user_name'>
                Username
              </label>
              <input 
                required
                type='text'
                name='user_name'
                id='RegistrationForm-user_name'
              />
            </div>
            <div className='password'>
              <label htmlFor='RegistrationForm-password'>
                Password
              </label>
              <input 
                required
                type='password'
                name='password'
                id='RegistrationForm-password'
              />
            </div>
            <button type='submit'>Sign Up</button>
          </form>
        </div>
      </>
    )
  }
}