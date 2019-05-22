import React, {Component} from 'react';
import TaskApiService from '../../services/task-api-service';
import TokenService from '../../services/token-service';
import Draggable from 'react-draggable';
import Context from '../../context/Context';
import './Tasks.css';

export default class Tasks extends Component {

  static contextType = Context;

  state = {
    dragId: null,
    offset: 0
    // userTasks: []
  }


  componentDidMount() {
    const userId = TokenService.getUserId()

    TaskApiService.getUserTasks(userId)
      .then(tasks => this.context.setUserTasks(tasks))
  }

  // componentDidMount() {
  //   const userTasks = this.props.userTasks

  //   console.log('Tasks.js userTasks', userTasks)
  //   console.log('Tasks.js context tasks', this.context.userTasks)

  //   this.setState({userTasks})
  // }

  getTaskById(taskId) {
    return this.context.userTasks.find(task => task.id === taskId)
  }

  handleDrag(e) {
    e.preventDefault();
  }

  handleStart(event, dragElement) {
    //getting Task id of dragged element
    this.setState({dragId: Number(dragElement.node.attributes[1].nodeValue)})
  }

  handleStop(event, dragElement) {

    const taskId = this.state.dragId
    const task = this.getTaskById(taskId)
    console.log(task)

    if (dragElement.lastX < -100) {
      TaskApiService.updateTask(taskId, dragElement.lastY, true)
        .then(task => this.context.updateUserTask(task[0]))
    } else if (task.scheduled) {
      TaskApiService.updateTask(taskId, 0, false)
        .then(task => this.context.updateUserTask(task[0]))
    }

  }

  handleDelete(id) {
    TaskApiService.deleteTask(id)
      .then(taskId => {
        this.context.deleteUserTask(taskId[0])
      })
  }
  // trying without sorting
  // map this.sortTasks(tasks) to reintroduce
  
  // sortTasks(tasks) {
  //   const sortedTasks = [];
  //   tasks.map(task => {
  //     if (task.priority === 'high') {
  //       sortedTasks.push(task)
  //     }
  //   })
  //   tasks.map(task => {
  //     if (task.priority === 'medium') {
  //       sortedTasks.push(task)
  //     }
  //   })
  //   tasks.map(task => {
  //     if (task.priority === 'low') {
  //       sortedTasks.push(task)
  //     }
  //   })
  //   return sortedTasks;
  // }

  offset = 0;

  positionTask(task) {
    if (!task.scheduled) {
      const pos = {x: 0, y: this.offset};
      this.offset = this.offset + task.duration;
      return pos 
    } 
    if (task.scheduled) {
      return {x: -170, y: task.position};
    }
  }

  // positionTask(task) {
  //   if (!task.scheduled) {
  //     const pos = {Position:{x: 0, y: this.offset}};
  //     this.offset = this.offset + task.duration;
  //     return pos 
  //   } 
  //   if (task.scheduled) {
  //     return {defaultPosition:{x: -170, y: task.position}};
  //   }
  // }
  
  renderTasks() {
    //const tasks = this.context.userTasks;
    console.log('rendering tasks', this.context)
    const tasks = this.context.userTasks.map(task => 
      <Draggable
        onStart={this.handleStart.bind(this)}
        onStop={this.handleStop.bind(this)}
        key={task.id+1}
        handle='.handle'
        bounds='.schedule'
        grid={[170, 30]}
        defaultPosition={this.positionTask(task)}
        >
        <div
          className={`task ${task.priority}`}
          id={task.id}
          style={{
            height: task.duration,
            position: 'absolute'
          }}
        >
          <p className='handle' onTouchMove={this.handleDrag.bind(this)}>{task.task_name}</p>
          <button 
          className='delete-task'
          onClick={() => this.handleDelete(task.id)}>
          X
          </button>
        </div>
      </Draggable>
    )
    this.offset = 0;
    return tasks;
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