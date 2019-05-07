import React, { Component } from 'react';
import TasksForm from '../../components/TasksForm/TasksForm';
import Context from '../../context/Context';
import SleepForm from '../../components/SleepForm/SleepForm';
import TaskApiService from '../../services/task-api-service';
import TokenService from '../../services/token-service';
import Timeline from '../../components/Timeline/Timeline';


export default class TasksPage extends Component {
  static contextType = Context;

  // componentDidMount() {
  //   const hasId = TokenService.hasUserId()
  //   if (hasId) {
  //     const userId = TokenService.getUserId();
  //     this.context.setUserId(userId);
  //   }


  // }

  componentDidMount() {

    // const hasId = TokenService.hasUserId()

    // if (hasId) {
    //   const userId = TokenService.getUserId();
    //   this.context.setUserId(userId);
    // }

    // const userId = TokenService.getUserId()

    // this.context.setUserId(userId)

    // TaskApiService.getUserTasks(userId)
    //   .then(this.context.setUserTasks)

    // TaskApiService.getUserSleep(userId)
    //   .then(sleep => this.context.setUserSleep(sleep))

    console.log('tasksPage cDM', this.context)

  }

  


  render() {
    // const satLength = this.context.sat_bed - this.context.sat_wake
    // const sunLength = this.context.sun_bed - this.context.sun_wake

    return (
      <>
        <SleepForm />
        <TasksForm />
        <Timeline start={this.context.sat_wake} end={this.context.sat_bed}/>
        <Timeline start={this.context.sun_wake} end={this.context.sun_bed}/>
      </>

    )
  }
}