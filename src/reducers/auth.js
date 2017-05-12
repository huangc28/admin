import { handleActions } from 'redux-actions'

import * as loadingStatus from '../constants/loadingState'
import * as actions from '../actions/auth'

const INIT_STATE = {
  loading: loadingStatus.EMPTY,
  accessToken: null,
  errorMessage: null,
}

const authReducer = handleActions({
  [actions.login]: (state, action) => ({
    loading: loadingStatus.LOADING,
  }),
  [actions.loginSuccess]: (state, action) => ({
    errorMessage: null,
    accessToken: action.payload.token,
  }),
  [actions.loginFailed]: (state, action) => ({
    errorMessage: action.payload.errorMessage,
    accessToken: null,
  }),
  [actions.logout]: (state, action) => ({
    errorMessage: null,
    accessToken: null,
  }),
}, INIT_STATE)

export const getAccessToken = state => state.auth.accessToken

export default authReducer

