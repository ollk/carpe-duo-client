import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';

export default class LandingPage extends Component {

  //RELATED TO handleLoginSuccess
  // static defaultProps = {
  //   location: {},
  //   history: {
  //     push: () => {}
  //   }
  // }

  state = { error: null }

  //NOT SURE IF THIS WILL BE NECCESSARY
  // handleLoginSuccess = () => {
  //   const { location, history } = this.props
  //   const destination = (location.state || {}).from || '/'
  //   history.push(destination)
  // }

  handleSubmitJwtAuth = event => {
    event.preventDefault()
    this.setState({error: null})
    const { user_name, password } = event.target

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value
    })
      .then(res => {
        user_name.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
        //this.handleLoginSuccess()
      })
      .catch(res => {
        this.setState({error: res.error})
      })
  }

  render() {
    const {error} = this.state
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

        <form className='LoginForm'
          onSubmit={this.handleSubmitJwtAuth}
        >
          <div role='alert'>
          {error && <p className='red'>{error}</p>}
          </div>
          <div className='user_name'>
            <label htmlFor='LoginForm-user_name'>
              User name
            </label>
            <input 
              required 
              type='text'
              name='user_name' 
              id='LoginForm-user_name'
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