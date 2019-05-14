import React, { Component } from 'react';

const Context = React.createContext({

  error: null,

  userId: null,
  userName: null,
  userTasks: [],
  sat_wake: 14,
  sat_bed: 44,
  sun_wake: 62,
  sun_bed: 92,
  setUserId: () => {},
  setUserName: () => {},
  setUserTasks: () => {},
  addUserTask: () => {},
  deleteUserTask: () => {},
  updateUserTask: () => {},
  setUserSleep: () => {}
})
export default Context

export class ContextProvider extends Component {
  state = {

    error: null,

    userId: null,
    userName: null,
    userTasks: [],
    sat_wake: 14,
    sat_bed: 44,
    sun_wake: 62,
    sun_bed: 92
  };

  setUserId = userId => {
    this.setState({ userId })
    console.log('setUserId', this.state)
  }

  setUserName = userName => {
    this.setState({ userName })
    console.log('setUserName', this.state)
  }

  setUserTasks = userTasks => {
    this.setState({ userTasks }, () => console.log(this.state.userTasks))
    console.log('setUserTasks', this.state)
  }

  addUserTask = userTask => {
    this.setUserTasks([
      ...this.state.userTasks,
      userTask
    ])
  }

  deleteUserTask = taskId => {
    const newTasks = this.state.userTasks.filter(task => task.id !== taskId)
    this.setUserTasks(newTasks)
  }

  updateUserTask = userTask => {
    const newTasks = this.state.userTasks.filter(task => task.id !== userTask.id)
    this.setUserTasks([...newTasks, userTask])
    console.log('updateUserTask', this.state)
  }

  setUserSleep = (userSleep) => {
    this.setState(userSleep)
    console.log('setUserSleep', this.state)
  }
  

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }


  render() {
    const value = {

      error: this.state.error,

      userId: this.state.userId,
      userName: this.state.userName,
      userTasks: this.state.userTasks,
      sat_wake: this.state.sat_wake,
      sat_bed: this.state.sat_bed,
      sun_wake: this.state.sun_wake,
      sun_bed: this.state.sun_bed,
      setUserId: this.setUserId,
      setUserTasks: this.setUserTasks,
      addUserTask: this.addUserTask,
      deleteUserTask: this.deleteUserTask,
      updateUserTask: this.updateUserTask,
      setUserSleep: this.setUserSleep
    }
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }
}