import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import LandingPage from '../LandingPage/LandingPage';
import Registration from '../Registration/Registration';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App_header'>
          <Header />
        </header>
        <main className='App_main'>
          <Switch>
            <Route exact path={'/'} component={LandingPage}/>

            <Route exact path={'/Register'} component={Registration}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
