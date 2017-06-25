import { createActions, handleActions } from 'redux-actions'

import * as loadingStatus from '../constants/loadingState'

export const {
  searchUsers,
  searchUsersSuccess,
  searchUsersFailed,
} = createActions({
  SEARCH_USERS: text => ({
    text,
  }),
  SEARCH_USERS_SUCCESS: searchResult => ({
    searchResult,
  }),
  SEARCH_USERS_FAILED: errorMessage => ({
    errorMessage,
  }),
})

const INIT_STATE = {
  searchResult: [],
  loading: loadingStatus.EMPTY,
  errorMessage: null,
}

const reducer = handleActions({
  [searchUsers]: (state, action) => ({
    ...state,
    loading: loadingStatus.LOADING,

  }),
  [searchUsersSuccess]: (state, action) => ({
    ...state,
    loading: loadingStatus.READY,
    searchResult: action.payload.searchResult,
  }),
  [searchUsersFailed]: (state, action) => ({
    ...state,
    errorMessage: action.payload.errorMessage,
  }),
}, INIT_STATE)

export default reducer