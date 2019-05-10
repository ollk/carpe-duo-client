import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import Header from '../Header/Header';
import LandingPage from '../../routes/LandingPage/LandingPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import TasksPage from '../../routes/TasksPage/TasksPage';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicRoute from '../Utils/PublicRoute';
import LoginPage from '../../routes/LoginPage/LoginPage';
import SleepPage from '../../routes/SleepPage/SleepPage';

import './App.css';

class App extends Component {



  render() {
    return (
      <div className='App'>
        {/* <header className='App_header'>
          <Header />
        </header> */}
        <main className='App_main'>
          <Switch>
            <PublicRoute exact path={'/'} component={LandingPage}/>
            <PublicRoute exact path={'/Register'} component={RegistrationPage}/>
            <PublicRoute exact path={'/Login'} component={LoginPage}/>
            <PrivateRoute path={'/Sleep'} component={SleepPage}/>
            <PrivateRoute path={'/Tasks'} component={TasksPage}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
