import React, { Component } from 'react';

const Context = React.createContext({
  userId: null,
  userTasks: {
    taskName: '',
    taskDuration: 20,
    taskPriority: 2
  },
  userSatWake: 8,
  userSatBed: 20,
  userSunWake: 8,
  userSunBed: 20,
  setUserId: () => {},
  setUserTasks: () => {},
  setUserSatWake: () => {},
  setUserSatBed: () => {},
  setUserSunWake: () => {},
  setUserSunBed: () => {}
})
export default Context

export class ContextProvider extends Component {
  state = {
    userId: null,
    userTasks: {
      taskName: '',
      taskDuration: 20,
      taskPriority: 2
    },
    userSatWake: 8,
    userSatBed: 20,
    userSunWake: 8,
    userSunBed: 20
  };

  setUserId = userId => {
    this.setState({ userId })
  }

  setUserTasks = userTasks => {
    this.setState({ userTasks })
  }

  setUserSatWake = userSatWake => {
    this.setState({ userSatWake })
  }

  setUserSatBed = userSatBed => {
    this.setState({ userSatBed })
  }

  setUserSunWake = userSunWake => {
    this.setState({ userSunWake })
  }

  setUserSunBed = userSunBed => {
    this.setState({ userSunBed })
  }

  render() {
    const value = {
      userId: this.state.userId,
      userTasks: this.state.userTasks,
      userSatWake: this.state.userSatWake,
      userSatBed: this.state.userSatBed,
      userSunWake: this.state.userSunWake,
      userSunBed: this.state.userSunBed,
      setUserId: this.setUserId,
      setUserTasks: this.setUserTasks,
      setUserSatWake: this.setUserSatWake,
      setUserSatBed: this.setUserSatBed,
      setUserSunWake: this.setUserSunWake,
      setUserSunBed: this.setUserSunBed
    }
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }
}