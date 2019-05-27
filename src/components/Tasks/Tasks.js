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
    offset: 0,
  }


  componentDidMount() {
    const userId = TokenService.getUserId()

    TaskApiService.getUserTasks(userId)
      .then(tasks => this.context.setUserTasks(tasks))

  }


  getTaskById(taskId) {
    return this.context.userTasks.find(task => task.id === taskId)
  }

  handleStart(event, dragElement) {
    //getting Task id of dragged element
    this.setState({dragId: Number(dragElement.node.attributes[1].nodeValue)})

    //prevent scroll attempt
    document.addEventListener('touchmove', this.preventScroll, { passive:false });
  }

  handleStop(event, dragElement) {

    const taskId = this.state.dragId
    const task = this.getTaskById(taskId)

    if (dragElement.lastX < -100) {
      TaskApiService.updateTask(taskId, dragElement.lastY, true)
        .then(task => this.context.updateUserTask(task[0]))
    } else if (task.scheduled) {
      TaskApiService.updateTask(taskId, 0, false)
        .then(task => this.context.updateUserTask(task[0]))
    }

    //prevent scroll attempt
    document.removeEventListener('touchmove', this.preventScroll, { passive:false });

  }

  //prevent scroll attempt
  preventScroll(e) {
    e.preventDefault()
    console.log('dragging')
    //alert('dragging')
  }

  handleDelete(id) {
    TaskApiService.deleteTask(id)
      .then(taskId => {
        this.context.deleteUserTask(taskId[0])
      })
  }
 

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

  //prevent scroll attempt
  handleDrag(e) {
    e.preventDefault();
    console.log('dragging');
  }
  
  renderTasks() {
    const tasks = this.context.userTasks.map(task => 
      <Draggable
        onStart={this.handleStart.bind(this)}
        onStop={this.handleStop.bind(this)}
        key={task.id+1}
        handle='.handle'
        bounds='.schedule'
        grid={[170, 30]}
        defaultPosition={this.positionTask(task)}
        touchmove={this.handleDrag}
        >
        <div
          className={`task ${task.priority}`}
          id={task.id}
          style={{
            height: task.duration,
            position: 'absolute'
          }}
        >
          <p className='handle' >{task.task_name}</p>
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