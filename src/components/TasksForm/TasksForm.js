import React, {Component} from 'react';
import Context from '../../context/Context';
import TaskApiService from '../../services/task-api-service';

export default class TasksForm extends Component {

  state = { 
    error: null,
    
    task_name: '',
    duration: 20,
    priority: 'medium'
  }

  updateTaskName(task_name) {
    this.setState({task_name})
  }

  updateDuration(duration) {
    this.setState({duration: Number(duration)})
  }

  updatePriority(priority) {
    this.setState({priority})
  }

  resetForm() {
    this.setState({
      task_name: '',
      duration: 20,
      priority: 'medium'
    })
    document.getElementById('TasksForm_task_name').value='';
    document.getElementById('TasksForm_duration').value='20';
    document.getElementById('TasksForm_priority').value='medium';
  }

  static contextType = Context;

  handleSubmit = event => {
    event.preventDefault();
    const {userId} = this.context;
    const {task_name, duration, priority} = this.state;
    
    TaskApiService.postTask(task_name, duration, priority, userId)
    //TODO: will this work?  
      .then(res => this.context.addUserTask(res))
      .then(() => {
        this.resetForm();
      })
      .catch(this.context.setError)
  }

  render() {
    const { error } = this.state
    return (
      <form className='TasksForm' onSubmit={this.handleSubmit}>

        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>

        <div className='task_name-div'>
          <label htmlFor='TasksForm_task_name'>
            Task name
          </label>
          <input required name='task_name' id='TasksForm_task_name'
          onChange={event => this.updateTaskName(event.target.value)}/>
        </div>

        <div className='duration-div'>
          <label htmlFor='TasksForm_duration'>
            Task duration
          </label>
          <select required name='duration' id='TasksForm_duration' defaultValue='20'
          onChange={event => this.updateDuration(event.target.value)}>
            <option value='20'>20 minutes</option>
            <option value='40'>40 minutes</option>
            <option value='60'>1 hour</option>
            <option value='80'>1 hour 20 minutes</option>
            <option value='100'>1 hour 40 minutes</option>
            <option value='120'>2 hours</option>
            <option value='140'>2 hours 20 minutes</option>
            <option value='160'>2 hours 40 minutes</option>
            <option value='180'>3 hours</option>
            <option value='200'>3 hours 20 minutes</option>
            <option value='220'>3 hours 40 minutes</option>
            <option value='240'>4 hours</option>
          </select>
        </div>

        <div className='priority-div'>
          <label htmlFor='TasksForm_priority'>
            Priority
          </label>
          <select required name='priority' id='TasksForm_priority' defaultValue='medium'
          onChange={event => this.updatePriority(event.target.value)}>
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
          </select>
        </div>

        <input type='submit' value='Create Task'/>
        
      </form>
    )
  }
}