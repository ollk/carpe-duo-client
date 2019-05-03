import React, { Component } from 'react';
import TasksForm from '../../components/TasksForm/TasksForm';
import Context from '../../context/Context';

export default class TasksPage extends Component {

  static contextType = Context;

  render() {
    console.log(this.context)
    return (
      <>
        <TasksForm />
        <p>{this.context.userId}</p>
      </>
    )
  }
}