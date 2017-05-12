import { createActions } from 'redux-actions'

export const {
  login,
  loginSuccess,
  loginFailed,
  logout,
} = createActions({
  LOGIN: (email, password) => ({
    email,
    password,
  }),
  LOGIN_FAILED: errorMessage => ({
    errorMessage,
  }),
  LOGIN_SUCCESS: token => ({ token }),
}, 'LOGOUT')
