import React, { Component } from 'react';

const Context = React.createContext({

  error: null,

  userId: null,
  userTasks: [],
  userSatWake: 14,
  userSatBed: 44,
  userSunWake: 62,
  userSunBed: 92,
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
    userSatWake: 14,
    userSatBed: 44,
    userSunWake: 62,
    userSunBed: 92
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
  // setUserSatWake = userSatWake => {
  //   this.setState({userSatWake})
  // }
  // setUserSatBed = userSatBed => {
  //   this.setState({userSatBed})
  // }
  // setUserSunWake = userSunWake => {
  //   this.setState({userSunWake})
  // }
  // setUserSunBed = userSunBed => {
  //   this.setState({userSunBed})
  // }

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
      userSatWake: this.state.userSatWake,
      userSatBed: this.state.userSatBed,
      userSunWake: this.state.userSunWake,
      userSunBed: this.state.userSunBed,
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