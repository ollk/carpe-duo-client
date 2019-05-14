import jwtDecode from 'jwt-decode';
import config from '../config';

let _timeoutId
const _TEN_SECONDS_IN_MS = 10000

const TokenService = {

  saveAuthToken(token) {
    window.sessionStorage.setItem(config.TOKEN_KEY, token);
  },
  getAuthToken() {
    return window.sessionStorage.getItem(config.TOKEN_KEY);
  },
  clearAuthToken() {
    console.info('clearing the auth token');
    window.sessionStorage.removeItem(config.TOKEN_KEY);
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },

  saveUserId(userId) {
    window.sessionStorage.setItem('userId', userId);
  },
  getUserId() {
    return window.sessionStorage.getItem('userId');
  },
  clearUserId() {
    window.sessionStorage.removeItem('userId');
  },

  parseJwt(jwt) {
    return jwtDecode(jwt)
  },
  readJwtToken() {
    return TokenService.parseJwt(TokenService.getAuthToken())
  },
  _getMsUntilExpiry(payload) {
    return (payload.exp*1000) - Date.now()
  },
  queueCallbackBeforeExpiry(callback) {
    const msUntilExpiry = TokenService._getMsUntilExpiry(TokenService.readJwtToken())
    _timeoutId = setTimeout(callback, msUntilExpiry - _TEN_SECONDS_IN_MS)
  },
  clearCallbackBeforeExpiry() {
    clearTimeout(_timeoutId)
  }

}

export default TokenService;