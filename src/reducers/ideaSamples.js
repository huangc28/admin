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
  [actions.editIdeaSample]: (state, action) => ({
    ...state,
    loading: loadingStatus.LOADING,
  }),
  [actions.editIdeaSampleSuccess]: (state, action) => ({
    ...state,
    loading: loadingStatus.READY,
    data: [
      ...state.data.map(sample => {
        if (sample.id === action.payload.ideaSample.id) {
          return action.payload.ideaSample
        }

        return sample
      }),
    ],
  }),
  [actions.editIdeaSampleFailed]: (state, action) => ({
    ...state,
    loading: loadingStatus.ERROR,
    errorMessage: action.payload.errorMessage,
  }),
  [actions.saveIdeaSample]: (state, action) => ({
    ...state,
    loading: loadingStatus.LOADING,
  }),
  [actions.saveIdeaSampleSuccess]: (state, action) => ({
    ...state,
    loading: loadingStatus.READY,
  }),
  [actions.saveIdeaSampleFailed]: (state, action) => ({
    ...state,
    errorMessage: action.payload.errorMessage,
    loading: loadingStatus.ERROR,
  }),
}, INIT_STATE)

export default ideaSamplesReducer