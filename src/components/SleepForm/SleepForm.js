import React, {Component} from 'react';
import Context from '../../context/Context';
import TaskApiService from '../../services/task-api-service';

export default class SleepForm extends Component {

  state = { 
    error: null,
    formValid: true,
    
    userSatWake: 14,
    userSatBed: 44,
    userSunWake: 62,
    userSunBed: 92
  }
  
  validateTimes() {
    const { userSatBed, userSunWake } = this.state;

    if(userSatBed >= userSunWake) {
      this.setState({
        error: 'Saturday Bed Time must be before Sunday Wake Time', 
        formValid: false
      })
    } else {
      this.setState({
        error: null,
        formValid: true
      })
    }
  }



  updateUserSatWake(userSatWake) {
    this.setState({userSatWake: Number(userSatWake)},
    () => {this.validateTimes()})
  }

  updateUserSatBed(userSatBed) {
    this.setState({userSatBed: Number(userSatBed)},
    () => {this.validateTimes()})
  }

  updateUserSunWake(userSunWake) {
    this.setState({userSunWake: Number(userSunWake)},
    () => {this.validateTimes()})
  }

  updateUserSunBed(userSunBed) {
    this.setState({userSunBed: Number(userSunBed)},
    () => {this.validateTimes()})
  }

  resetForm() {
    this.setState({
      userSatWake: 14,
      userSatBed: 44,
      userSunWake: 62,
      userSunBed: 92
    })
    document.getElementById('SleepForm_userSatWake').value='14';
    document.getElementById('SleepForm_userSatBed').value='44';
    document.getElementById('SleepForm_userSunWake').value='62';
    document.getElementById('SleepForm_userSunBed').value='92';
  }

  static contextType = Context;

  handleSubmit = event => {
    event.preventDefault();
    const {userId} = this.context;
    const {userSatWake, userSatBed, userSunWake, userSunBed} = this.state;
    
    TaskApiService.postSleep(userId, userSatWake, userSatBed, userSunWake, userSunBed)
    //TODO: will this work?  
      .then(res => this.context.setUserSleep(res[0]))
      //.then(res => console.log(res[0]))
      //dont think I want to resent the form here
      // .then(() => {
      //   this.resetForm();
      // })
      .catch(this.context.setError)
  }

  render() {
    const { error } = this.state
    return (
      <form className='SleepForm' onSubmit={this.handleSubmit}>

        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>

        <div className='userSatWake-div'>
          <label htmlFor='SleepForm_userSatWake'>
            Saturday Wake Time
          </label>
          <select required name='userSatWake' id='SleepForm_userSatWake' defaultValue='14'
          onChange={event => this.updateUserSatWake(event.target.value)}>
            <option value='6'>3:00AM</option>
            <option value='7'>3:30AM</option>
            <option value='8'>4:00AM</option>
            <option value='9'>4:30AM</option>
            <option value='10'>5:00AM</option>
            <option value='11'>5:30AM</option>
            <option value='12'>6:00AM</option>
            <option value='13'>6:30AM</option>
            <option value='14'>7:00AM</option>
            <option value='15'>7:30AM</option>
            <option value='16'>8:00AM</option>
            <option value='17'>8:30AM</option>
            <option value='18'>9:00AM</option>
            <option value='19'>9:30AM</option>
            <option value='20'>10:00AM</option>
            <option value='21'>10:30AM</option>
            <option value='22'>11:00AM</option>
            <option value='23'>11:30AM</option>
            <option value='24'>12:00PM</option>
            <option value='25'>12:30PM</option>
            <option value='26'>1:00PM</option>
            <option value='27'>1:30PM</option>
            <option value='28'>2:00PM</option>
            <option value='29'>2:30PM</option>
            <option value='30'>3:00PM</option>
          </select>
        </div>

        <div className='userSatBed-div'>
          <label htmlFor='SleepForm_userSatBed'>
            Saturday Bed Time
          </label>
          <select required name='userSatBed' id='SleepForm_userSatBed' defaultValue='44'
          onChange={event => this.updateUserSatBed(event.target.value)}>
            <option value='34'>5:00PM</option>
            <option value='35'>5:30PM</option>
            <option value='36'>6:00PM</option>
            <option value='37'>6:30PM</option>
            <option value='38'>7:00PM</option>
            <option value='39'>7:30PM</option>
            <option value='40'>8:00PM</option>
            <option value='41'>8:30PM</option>
            <option value='42'>9:00PM</option>
            <option value='43'>9:30PM</option>
            <option value='44'>10:00PM</option>
            <option value='45'>10:30PM</option>
            <option value='46'>11:00PM</option>
            <option value='47'>11:30PM</option>
            <option value='48'>12:00AM</option>
            <option value='49'>12:30AM</option>
            <option value='50'>1:00AM</option>
            <option value='51'>1:30AM</option>
            <option value='52'>2:00AM</option>
            <option value='53'>2:30AM</option>
            <option value='54'>3:00AM</option>
            <option value='55'>3:30AM</option>
            <option value='56'>4:00AM</option>
            <option value='57'>4:30AM</option>
            <option value='58'>5:00AM</option>
          </select>
        </div>

        <div className='userSunWake-div'>
          <label htmlFor='SleepForm_userSunWake'>
            Sunday Wake Time
          </label>
          <select required name='userSunWake' id='SleepForm_userSunWake' defaultValue='62'
          onChange={event => this.updateUserSunWake(event.target.value)}>
            <option value='54'>3:00AM</option>
            <option value='55'>3:30AM</option>
            <option value='56'>4:00AM</option>
            <option value='57'>4:30AM</option>
            <option value='58'>5:00AM</option>
            <option value='59'>5:30AM</option>
            <option value='60'>6:00AM</option>
            <option value='61'>6:30AM</option>
            <option value='62'>7:00AM</option>
            <option value='63'>7:30AM</option>
            <option value='64'>8:00AM</option>
            <option value='65'>8:30AM</option>
            <option value='66'>9:00AM</option>
            <option value='67'>9:30AM</option>
            <option value='68'>10:00AM</option>
            <option value='69'>10:30AM</option>
            <option value='70'>11:00AM</option>
            <option value='71'>11:30AM</option>
            <option value='72'>12:00PM</option>
            <option value='73'>12:30PM</option>
            <option value='74'>1:00PM</option>
            <option value='75'>1:30PM</option>
            <option value='76'>2:00PM</option>
            <option value='77'>2:30PM</option>
            <option value='78'>3:00PM</option>
          </select>
        </div>

        <div className='userSunBed-div'>
          <label htmlFor='SleepForm_userSunBed'>
            Sunday Bed Time
          </label>
          <select required name='userSunBed' id='SleepForm_userSunBed' defaultValue='92'
          onChange={event => this.updateUserSunBed(event.target.value)}>
            <option value='82'>5:00PM</option>
            <option value='83'>5:30PM</option>
            <option value='84'>6:00PM</option>
            <option value='85'>6:30PM</option>
            <option value='86'>7:00PM</option>
            <option value='87'>7:30PM</option>
            <option value='88'>8:00PM</option>
            <option value='89'>8:30PM</option>
            <option value='90'>9:00PM</option>
            <option value='91'>9:30PM</option>
            <option value='92'>10:00PM</option>
            <option value='93'>10:30PM</option>
            <option value='94'>11:00PM</option>
            <option value='95'>11:30PM</option>
            <option value='96'>12:00AM</option>
            <option value='97'>12:30AM</option>
            <option value='98'>1:00AM</option>
            <option value='99'>1:30AM</option>
            <option value='100'>2:00AM</option>
            <option value='101'>2:30AM</option>
            <option value='102'>3:00AM</option>
            <option value='103'>3:30AM</option>
            <option value='104'>4:00AM</option>
            <option value='105'>4:30AM</option>
            <option value='106'>5:00AM</option>
          </select>
        </div>

        <button type='submit' disabled={!this.state.formValid}>
          Set Wake/Bed Times
        </button>
        
      </form>
    )
  }
}