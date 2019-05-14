import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import LandingPage from '../../routes/LandingPage/LandingPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import TasksPage from '../../routes/TasksPage/TasksPage';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicRoute from '../Utils/PublicRoute';
import LoginPage from '../../routes/LoginPage/LoginPage';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import IdleService from '../../services/idle-service';

import './App.css';


class App extends Component {


  componentDidMount() {
    IdleService.setIdleCallback(this.logoutFromIdle)

    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimerResets()
      TokenService.queueCallbackBeforeExpiry(() => {
        AuthApiService.postRefreshToken()
      })
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets()
    TokenService.clearCallbackBeforeExpiry()
  }

  logoutFromIdle = () => {
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()

    this.forceUpdate()
  }


  render() {
    return (
      <div className='App'>
        <main className='App_main'>
          <Switch>
            <PublicRoute exact path={'/'} component={LandingPage}/>
            <PublicRoute exact path={'/Register'} component={RegistrationPage}/>
            <PublicRoute exact path={'/Login'} component={LoginPage}/>
            <PrivateRoute path={'/Tasks'} component={TasksPage}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
