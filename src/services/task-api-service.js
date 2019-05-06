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
    console.log({task_name, duration, priority, userId});
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

  postSleep(userId, userSatWake, userSatBed, userSunWake, userSunBed) {
    return fetch(`${config.API_ENDPOINT}/sleep`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        id: userId,
        userSatWake,
        userSatBed,
        userSunWake,
        userSunBed
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