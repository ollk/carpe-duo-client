import React, {Component} from 'react';

export default class TasksForm extends Component {

  state = { error: null }

  handleSubmit = event => {
    event.preventDefault()
    const {task_name, duration, priority} = event.target
    
    
  }

  render() {
    const { error } = this.state
    return (
      <form className='TasksForm' onSubmit={this.handleSubmit}>

        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>

        <div className='task_name'>
          <label htmlFor='TasksForm_task_name'>
            Task name
          </label>
          <input required name='task_name' id='TasksForm_task_name'/>
        </div>

        <div className='duration'>
          <label htmlFor='TasksForm_duration'>
            Task duration
          </label>
          <select required name='duration' id='TasksForm_duration'>
            <option value={20}>20 minutes</option>
            <option value={40}>40 minutes</option>
            <option value={60}>1 hour</option>
            <option value={80}>1 hour 20 minutes</option>
            <option value={100}>1 hour 40 minutes</option>
            <option value={120}>2 hours</option>
            <option value={140}>2 hours 20 minutes</option>
            <option value={160}>2 hours 40 minutes</option>
            <option value={180}>3 hours</option>
            <option value={200}>3 hours 20 minutes</option>
            <option value={220}>3 hours 40 minutes</option>
            <option value={240}>4 hours</option>
          </select>
        </div>

        <div className='priority'>
          <label htmlFor='TasksForm_priority'>
            Priority
          </label>
          <select required name='priority' id='TasksForm_priority' defaultValue={2}>
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
          </select>
        </div>

        <input type='submit' value='Create Task'/>
        
      </form>
    )
  }
}