import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import Header from '../Header/Header';
import LandingPage from '../../routes/LandingPage/LandingPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import TasksPage from '../../routes/TasksPage/TasksPage';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicRoute from '../Utils/PublicRoute';
import TokenService from '../../services/token-service'
import Context from '../../context/Context'

class App extends Component {

  static contextType = Context;

  componentDidMount() {
    if (TokenService.hasUserId()) {
      const userId = TokenService.getUserId();
      this.context.setUserId(userId);
    }

    
  }

  render() {
    return (
      <div className='App'>
        <header className='App_header'>
          <Header />
        </header>
        <main className='App_main'>
          <Switch>
            <PublicRoute exact path={'/'} component={LandingPage}/>
            <PublicRoute exact path={'/Register'} component={RegistrationPage}/>
            {/* <PrivateRoute path={'/Tasks'} component={TasksPage}/> */}
            <PrivateRoute path={'/Tasks'} component={TasksPage}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
