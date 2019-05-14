import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import Context from '../../context/Context';
import './LoginPage.css';
import TaskApiService from '../../services/task-api-service';
import Header from '../../components/Header/Header';

export default class LoginPage extends Component {

  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  }

  static contextType = Context;

  state = { error: null }

  handleLoginSuccess = userId => {
    TaskApiService.getUserTasks(userId)
      .then(res => {
        if (res.length > 0) {
          this.props.history.push('/Tasks')
        } else {
          this.props.history.push('/Tasks/Sleep')
        }
      })
  }

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
        //TokenService.saveAuthToken(res.authToken)
        //TokenService.saveUserId(res.userId)
        this.handleLoginSuccess(res.userId)
      })
      .catch(res => {
        this.setState({error: res.error})
      })
  }

  render() {
    const {error} = this.state
    return (
      <>
        <Header />
        <div className='login-box'>
          <h1>Log In</h1>
          <p className='new'>
            New to Carpe Duo?
            <Link to='/Register' className='registration-link'> Sign Up</Link>
          </p>
          
          <form className='LoginForm'
            onSubmit={this.handleSubmitJwtAuth}
          >
            <div role='alert'>
            {error && <p className='red'>{error}</p>}
            </div>
            <div className='user_name'>
              <label htmlFor='LoginForm-user_name'>
                Username
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
            <button type='submit'>Log In</button>
          </form>
        </div>


      </>
    )
  }
}