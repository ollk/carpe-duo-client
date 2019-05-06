import React, { Component } from 'react';
import TasksForm from '../../components/TasksForm/TasksForm';
import Context from '../../context/Context';
import SleepForm from '../../components/SleepForm/SleepForm';
import TaskApiService from '../../services/task-api-service';
import TokenService from '../../services/token-service';


export default class TasksPage extends Component {
  static contextType = Context

  componentDidMount() {
    const userId = TokenService.getUserId()

    TaskApiService.getUserTasks(userId)
      .then(this.context.setUserTasks)

    // TokenService.getUserId()
    //   .then(TaskApiService.getUserTasks)
    //     .then(this.context.setUserTasks)
  }

  static contextType = Context;

  render() {
    //console.log(this.context)
    return (
      <>
        <SleepForm />
        <TasksForm />
      </>
    )
  }
}