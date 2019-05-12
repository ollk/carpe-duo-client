import React, { Component } from 'react';
import SleepForm from '../../components/SleepForm/SleepForm';
import './SleepPage.css';
import Header from '../../components/Header/Header';


export default class SleepPage extends Component {



  render() {
    return (
      <>
        <Header />
        <SleepForm />
      </>
    )
  }
}