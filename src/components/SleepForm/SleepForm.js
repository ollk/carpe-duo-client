import React, {Component} from 'react';
import Context from '../../context/Context';
import TaskApiService from '../../services/task-api-service';
import TokenService from '../../services/token-service';

export default class SleepForm extends Component {

  static contextType = Context;

  state = { 
    error: null,
    formValid: true,
    
    userId: null,
    sat_wake: 14,
    sat_bed: 44,
    sun_wake: 62,
    sun_bed: 92
  }

  componentDidMount() {

    console.log('sleepForm cDM', this.context)
   
    const userId = TokenService.getUserId()

    TaskApiService.getUserSleep(userId)
      .then(sleep => {
        document.getElementById('SleepForm_SatWake').value=sleep.sat_wake;
        document.getElementById('SleepForm_SatBed').value=sleep.sat_bed;
        document.getElementById('SleepForm_SunWake').value=sleep.sun_wake;
        document.getElementById('SleepForm_SunBed').value=sleep.sun_bed;
        this.setState({
          userId,
          sat_wake: sleep.sat_wake,
          sat_bed: sleep.sat_bed,
          sun_wake: sleep.sun_wake,
          sun_bed: sleep.sun_bed
        })
        this.context.setUserSleep(sleep)

      })

  }
  
  validateTimes() {
    const { sat_bed, sun_wake } = this.state;

    if(sat_bed >= sun_wake) {
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



  updateSatWake(sat_wake) {
    this.setState({sat_wake: Number(sat_wake)},
    () => {this.validateTimes()})
  }

  updateSatBed(sat_bed) {
    this.setState({sat_bed: Number(sat_bed)},
    () => {this.validateTimes()})
  }

  updateSunWake(sun_wake) {
    this.setState({sun_wake: Number(sun_wake)},
    () => {this.validateTimes()})
  }

  updateSunBed(sun_bed) {
    this.setState({sun_bed: Number(sun_bed)},
    () => {this.validateTimes()})
  }

  //not sure if I'll use this
  // resetForm() {
  //   this.setState({
  //     sat_wake: 14,
  //     sat_bed: 44,
  //     sun_wake: 62,
  //     sun_bed: 92
  //   })
  //   document.getElementById('SleepForm_SatWake').value='14';
  //   document.getElementById('SleepForm_SatBed').value='44';
  //   document.getElementById('SleepForm_SunWake').value='62';
  //   document.getElementById('SleepForm_SunBed').value='92';
  // }

  resetTasks() {
    const {userId} = this.state
    TaskApiService.resetUserTasks(userId)
      .then(res => this.context.setUserTasks(res))
      .catch(this.context.setError)
  }

  handleSubmit = event => {
    event.preventDefault();
    const {userId, sat_wake, sat_bed, sun_wake, sun_bed} = this.state;
    
    TaskApiService.postSleep(userId, sat_wake, sat_bed, sun_wake, sun_bed)
      .then(res => {
        this.context.setUserSleep(res[0])
        //possible problem
        this.resetTasks()
      })
      .catch(this.context.setError)
  }

  render() {
    const { error } = this.state
    return (
      <form className='SleepForm' onSubmit={this.handleSubmit}>

        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>

        <div className='satWake-div'>
          <label htmlFor='SleepForm_SatWake'>
            Saturday Wake Time
          </label>
          <select required name='satWake' id='SleepForm_SatWake'
          onChange={event => this.updateSatWake(event.target.value)}>
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

        <div className='satBed-div'>
          <label htmlFor='SleepForm_SatBed'>
            Saturday Bed Time
          </label>
          <select required name='satBed' id='SleepForm_SatBed'
          onChange={event => this.updateSatBed(event.target.value)}>
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

        <div className='sunWake-div'>
          <label htmlFor='SleepForm_SunWake'>
            Sunday Wake Time
          </label>
          <select required name='sunWake' id='SleepForm_SunWake'
          onChange={event => this.updateSunWake(event.target.value)}>
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

        <div className='sunBed-div'>
          <label htmlFor='SleepForm_SunBed'>
            Sunday Bed Time
          </label>
          <select required name='sunBed' id='SleepForm_SunBed'
          onChange={event => this.updateSunBed(event.target.value)}>
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