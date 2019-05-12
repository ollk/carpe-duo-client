import TokenService from '../services/token-service';
import config from '../config';

const TaskApiService = {

  getUserTasks(userId) {
    return fetch(`${config.API_ENDPOINT}/tasks/${userId}`, {
      headers: {
      'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  postTask(task_name, duration, priority, userId) {
    return fetch(`${config.API_ENDPOINT}/tasks`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        task_name,
        duration,
        priority,
        user_id: userId
      })
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
        )
  },

  updateTask(id, position, scheduled) {
    return fetch(`${config.API_ENDPOINT}/tasks/${id}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        position,
        scheduled
      })
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
        )
  },

  resetUserTasks(userId) {
    return fetch(`${config.API_ENDPOINT}/tasks/reset/${userId}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }      
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
        )
  },

  deleteTask(id) {
    return fetch(`${config.API_ENDPOINT}/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
        )
  },

  getUserSleep(userId) {
    return fetch(`${config.API_ENDPOINT}/sleep/${userId}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
        )
  },

  postSleep(userId, sat_wake, sat_bed, sun_wake, sun_bed) {
    return fetch(`${config.API_ENDPOINT}/sleep`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        id: userId,
        sat_wake,
        sat_bed,
        sun_wake,
        sun_bed
      })
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
        )
  }


}

export default TaskApiService;