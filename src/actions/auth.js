import { createActions } from 'redux-actions'

export const {
  login,
  loginSuccess,
  loginFailed,
  accessTokenUnauthorized,
  logout,
  clearAccessToken,
} = createActions({
  LOGIN: (email, password) => ({
    email,
    password,
  }),
  LOGIN_FAILED: errorMessage => ({
    errorMessage,
  }),
  ACCESS_TOKEN_UNAUTHORIZED: errorMessage => ({
    errorMessage,
  }),
  LOGIN_SUCCESS: token => ({ token }),
}, 'LOGOUT', 'CLEAR_ACCESS_TOKEN')
