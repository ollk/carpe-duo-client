import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

import Header from '../../components/Header/Header';

export default class LandingPage extends Component {

  render() {

    return (
      <>
        <Header />


        <header role='banner'>
          <h1>Carpe Duo</h1>
          <p>Seize the Weekend!</p>
        </header>

        <section className='welcome-message'>
          Welcome to Carpe Duo, an app designed to help you plan a productive weekend!
        </section>

        <Link to='/register' className='get-started-button'>
          Get Started
        </Link>
      </>
    )
  }
}