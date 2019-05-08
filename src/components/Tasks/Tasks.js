import React, {Component} from 'react';
import TaskApiService from '../../services/task-api-service';
import TokenService from '../../services/token-service';
import Draggable from 'react-draggable';
import Context from '../../context/Context';
import './Tasks.css';

export default class Tasks extends Component {

  static contextType = Context;


  componentDidMount() {
    const userId = TokenService.getUserId()

    TaskApiService.getUserTasks(userId)
      .then(tasks => this.context.setUserTasks(tasks))

  }

  getTaskById(taskId) {
    return this.context.userTasks.find(task => task.id === taskId)
  }

  handleStop(event, dragElement) {

    console.log(this.context)
    console.log(event, dragElement)
    console.log(dragElement.lastY)
    console.log(Number(event.path[1].id))

    const taskId = Number(event.path[1].id)
    const task = this.getTaskById(taskId)

    if (dragElement.lastX < -100) {
      TaskApiService.updateTask(taskId, dragElement.lastY, true)
        .then(task => this.context.updateUserTask(task))
    } else if (task.scheduled) {
      console.log('unschedule', task)
      TaskApiService.updateTask(taskId, 0, false)
        .then(task => this.context.updateUserTask(task))
    }

  }

  sortTasks(tasks) {
    const sortedTasks = [];
    tasks.map(task => {
      if (task.priority === 'high') {
        sortedTasks.push(task)
      }
    })
    tasks.map(task => {
      if (task.priority === 'medium') {
        sortedTasks.push(task)
      }
    })
    tasks.map(task => {
      if (task.priority === 'low') {
        sortedTasks.push(task)
      }
    })
    return sortedTasks;
  }

  offset = 0;

  positionTask(task) {
    if (!task.scheduled) {
      const pos = {x: 0, y: this.offset};
      this.offset = this.offset + task.duration;
      return pos 
    } 
    if (task.scheduled) {
      return {x: -150, y: task.position};
    }
  }
  
  renderTasks() {
    const tasks = this.context.userTasks;
    console.log(this.context)
    const res = this.sortTasks(tasks).map(task => 
      <Draggable
        onStop={this.handleStop.bind(this)}
        key={task.id}
        handle='.handle'
        bounds='.schedule'
        grid={[150, 30]}
        defaultPosition={this.positionTask(task)}
        >
        <div
          className='task'
          id={task.id}
          style={{
            height: task.duration,
            position: 'absolute'
          }}
        >
          <p className='handle'>{task.task_name}</p>

        </div>
      </Draggable>
    )
    this.offset = 0;
    return res;
  }

  render() {

    
    return (
      <>
        <p className='schedule-header'>Tasks</p>
        {this.renderTasks()}
      </>
    )
  }
}