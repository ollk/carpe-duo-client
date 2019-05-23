import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import TasksForm from '../../components/TasksForm/TasksForm';
import Context from '../../context/Context';
import Timeline from '../../components/Timeline/Timeline';
import Tasks from '../../components/Tasks/Tasks';
import './TasksPage.css';
import Header from '../../components/Header/Header';
import SleepForm from '../../components/SleepForm/SleepForm';
import TaskApiService from '../../services/task-api-service';
import TokenService from '../../services/token-service';


export default class TasksPage extends Component {

  static contextType = Context;


  componentDidMount() {

    console.log('rendering TasksPage', this.context)
    console.log('app.js start', this.context)
    const userId = TokenService.getUserId()
    this.context.setUserId(userId)
    Promise.all([
      TaskApiService.getUserTasks(userId),
      TaskApiService.getUserSleep(userId)
    ])
      .then(([taskRes, sleepRes]) => {
        this.context.setUserTasks(taskRes)
        this.context.setUserSleep(sleepRes)
        console.log('app.js end', this.context)
      })
    
  }


  // componentDidMount() {
  //   const userId = TokenService.getUserId()
  //   TaskApiService.getUserSleep(userId)
  //     .then(sleep => {
  //       this.context.setUserSleep(sleep)
  //     })
  // }



  
  render() {
   

    return (
      <>
        <Header />

        <Route path='/Tasks/Sleep' component={SleepForm}/>
        <Route path='/Tasks/New' component={TasksForm}/>
        {/* <div className='sleep-link-div'>
          <Link to='/Tasks/Sleep' className='sleep-link'>Change Waking Hours</Link>
          <Link to='/Tasks/New' className='tasks-link'>Create New Task</Link>
        </div> */}
        <div className='schedule'>
          <div className='timelines-div'>
            <Timeline 
              className='satTimeline'
              day='Saturday' 
              start={this.context.sat_wake} 
              end={this.context.sat_bed}
            />
            <Timeline 
              className='sunTimeline'
              day='Sunday' 
              start={this.context.sun_wake} 
              end={this.context.sun_bed}
            />
          </div>
          <div className='tasks-div'>
            <Tasks />
          </div>
        </div>
        
      </>

    )
  }
}