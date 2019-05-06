import config from '../config';

const TokenService = {

  saveAuthToken(token) {
    window.sessionStorage.setItem(config.TOKEN_KEY, token);
  },
  getAuthToken() {
    return window.sessionStorage.getItem(config.TOKEN_KEY);
  },
  clearAuthToken() {
    window.sessionStorage.removeItem(config.TOKEN_KEY);
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },

  //TODO: experiment, setting user in sessionStorage, is this secure?  wrong place?
  saveUserId(userId) {
    window.sessionStorage.setItem('userId', userId);
  },
  getUserId() {
    return window.sessionStorage.getItem('userId');
  },
  clearUserId() {
    window.sessionStorage.removeItem('userId');
  },
  hasUserId() {
    return !!TokenService.getAuthToken();
  }

}

export default TokenService;