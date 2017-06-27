import {
    createActions,
    handleActions,
} from 'redux-actions'

import * as loadingStatus from '../constants/loadingState'

export const LOGIN = 'LOGIN'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export const LOGOUT = 'LOGOUT'

export const CLEAR_ACCESS_TOKEN = 'CLEAR_ACCESS_TOKEN'
export const ACCESS_TOKEN_UNAUTHORIZED = 'ACCESS_TOKEN_UNAUTHORIZED'

export const {
  login,
  loginSuccess,
  loginFailed,
  accessTokenUnauthorized,
  logout,
  clearAccessToken,
} = createActions({
  [LOGIN]: (phone, password) => ({
    phone,
    password,
  }),
  [LOGIN_FAILED]: errorMessage => ({
    errorMessage,
  }),
  [LOGIN_SUCCESS]: info => {
    const { accessToken, username } = info

    return {
      accessToken,
      username,
    }
  },
  [ACCESS_TOKEN_UNAUTHORIZED]: errorMessage => ({
    errorMessage,
  }),
}, LOGOUT, CLEAR_ACCESS_TOKEN)

/**
 * Reducer.
 */
const INIT_STATE = {
  loading: loadingStatus.EMPTY,
  username: '',
  accessToken: null,
  errorMessage: null,
}

const authReducer = handleActions({
  [login]: (state, action) => ({
    ...state,
    loading: loadingStatus.LOADING,
  }),
  [loginSuccess]: (state, action) => {
    const { accessToken, username } = action.payload

    return {
      ...state,
      errorMessage: null,
      accessToken,
      username,
    }
  },
  [loginFailed]: (state, action) => ({
    ...state,
    errorMessage: action.payload.errorMessage,
    accessToken: null,
    username: '',
  }),
  [logout]: (state, action) => ({
    ...state,
    errorMessage: null,
    accessToken: null,
    username: '',
  }),
  [clearAccessToken]: (state, action) => ({
    ...state,
    accessToken: null,
  }),
  [accessTokenUnauthorized]: (state, action) => ({
    ...state,
    errorMessage: action.payload.errorMessage,
  }),
}, INIT_STATE)

export const getAccessToken = state => state.auth.accessToken

export default authReducer

