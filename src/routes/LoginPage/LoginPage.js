import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import Context from '../../context/Context';
import './LoginPage.css';

export default class LoginPage extends Component {

  //RELATED TO handleLoginSuccess
  // static defaultProps = {
  //   location: {},
  //   history: {
  //     push: () => {}
  //   }
  // }

  static contextType = Context;

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
        //setting userId in sessionStorage
        TokenService.saveUserId(res.userId)
        //setting userId in context, removed to try session storage route
        //this.context.setUserId(res.userId)
        //TODO:sending userid in path, maybe bad idea
        this.props.history.push(`/Tasks`)
      })
      .catch(res => {
        this.setState({error: res.error})
      })
  }

  render() {
    const {error} = this.state
    return (
      <>
        <h1>Log In</h1>
        <p className='new'>New to Carpe Duo?</p>
        <Link to='/Register'>Sign Up</Link>

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
            value='Log In'
          />
        </form>


      </>
    )
  }
}