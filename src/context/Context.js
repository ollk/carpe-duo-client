import React, { Component } from 'react';

const Context = React.createContext({

  error: null,

  userId: null,
  userTasks: [],
  sat_wake: 14,
  sat_bed: 44,
  sun_wake: 62,
  sun_bed: 92,
  setUserId: () => {},
  setUserTasks: () => {},
  addUserTask: () => {},
  setUserSleep: () => {}
})
export default Context

export class ContextProvider extends Component {
  state = {

    error: null,

    userId: null,
    userTasks: [],
    sat_wake: 14,
    sat_bed: 44,
    sun_wake: 62,
    sun_bed: 92
  };

  setUserId = userId => {
    this.setState({ userId })
  }

  setUserTasks = userTasks => {
    this.setState({ userTasks })
  }

  addUserTask = userTask => {
    console.log(userTask)
    this.setUserTasks([
      ...this.state.userTasks,
      userTask
    ])
  }

  setUserSleep = (userSleep) => {
    console.log(userSleep)
    this.setState(userSleep)
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
      userTasks: this.state.userTasks,
      sat_wake: this.state.sat_wake,
      sat_bed: this.state.sat_bed,
      sun_wake: this.state.sun_wake,
      sun_bed: this.state.sun_bed,
      setUserId: this.setUserId,
      setUserTasks: this.setUserTasks,
      addUserTask: this.addUserTask,
      setUserSleep: this.setUserSleep
    }
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }
}