import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../context/Context';
import SleepForm from '../../components/SleepForm/SleepForm';
import './SleepPage.css';
import Header from '../../components/Header/Header';


export default class SleepPage extends Component {

  static contextType = Context;

  state = {
    userName: 'user'
  }

  componentDidMount() {
    const userName = this.context.userName
    this.setState({ userName })
  }


  render() {
    return (
      <>

        <Header />

        <div className='sleep-div'>
          <p>Hi {this.state.userName}! Use the form below to set your bed and wake times for the weekend</p>
          <SleepForm />
        </div>
        <Link to='/Tasks'>Next</Link>
      </>
    )
  }
}