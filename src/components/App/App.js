import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import LandingPage from '../../routes/LandingPage/LandingPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import TasksPage from '../../routes/TasksPage/TasksPage';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicRoute from '../Utils/PublicRoute';
import LoginPage from '../../routes/LoginPage/LoginPage';
// import SleepPage from '../../routes/SleepPage/SleepPage';
import TaskApiService from '../../services/task-api-service';
import TokenService from '../../services/token-service';
import Context from '../../context/Context';

import './App.css';


class App extends Component {

  static contextType = Context;

  componentDidMount() {
    // console.log('app.js start', this.context)
    // const userId = TokenService.getUserId()
    // this.context.setUserId(userId)
    // Promise.all([
    //   TaskApiService.getUserTasks(userId),
    //   TaskApiService.getUserSleep(userId)
    // ])
    //   .then(([taskRes, sleepRes]) => {
    //     this.context.setUserTasks(taskRes)
    //     this.context.setUserSleep(sleepRes)
    //     console.log('app.js end', this.context)
    //   })
    
  }



  render() {
    return (
      <div className='App'>
        <main className='App_main'>
          <Switch>
            <PublicRoute exact path={'/'} component={LandingPage}/>
            <PublicRoute exact path={'/Register'} component={RegistrationPage}/>
            <PublicRoute exact path={'/Login'} component={LoginPage}/>
            {/* <PrivateRoute path={'/Sleep'} component={SleepPage}/> */}
            <PrivateRoute path={'/Tasks'} component={TasksPage}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
