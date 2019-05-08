import React, { Component } from 'react';
import TasksForm from '../../components/TasksForm/TasksForm';
import Context from '../../context/Context';
import SleepForm from '../../components/SleepForm/SleepForm';
import Timeline from '../../components/Timeline/Timeline';
import Tasks from '../../components/Tasks/Tasks';
import './TasksPage.css';


export default class TasksPage extends Component {

  static contextType = Context;


  render() {
   

    return (
      <>
        <SleepForm />
        <TasksForm />
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