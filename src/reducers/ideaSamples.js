import { handleActions } from 'redux-actions'

import * as actions from '../actions/ideaSamples'
import * as loadingStatus from '../constants/loadingState'

const INIT_STATE = {
  loading: loadingStatus.EMPTY,
  errorMessage: null,
  data: [],
}

const ideaSamplesReducer = handleActions({
  [actions.fetchSamples]: (state, action) => ({
    ...state,
    loading: loadingStatus.LOADING,
  }),
  [actions.fetchSamplesSuccess]: (state, action) => ({
    ...state,
    data: [
      ...state.data,
      ...action.payload.samples,
    ],
    loading: loadingStatus.READY,
  }),
  [actions.fetchSamplesFailed]: (state, action) => ({
    ...state,
    loading: loadingStatus.ERROR,
    errorMessage: action.payload.errorMessage,
  }),
}, INIT_STATE)

export default ideaSamplesReducer