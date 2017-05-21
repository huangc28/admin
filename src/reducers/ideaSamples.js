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
        if (
            sample &&
            sample.id &&
            sample.id === action.payload.ideaSample.id
          ) {
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
    data: [
      ...state.data,
      action.payload.ideaSample,
    ],
    loading: loadingStatus.READY,
  }),
  [actions.saveIdeaSampleFailed]: (state, action) => ({
    ...state,
    errorMessage: action.payload.errorMessage,
    loading: loadingStatus.ERROR,
  }),
  [actions.fetchSample]: (state, action) => ({
    ...state,
    loading: loadingStatus.LOADING,
  }),
  [actions.fetchSampleSuccess]: (state, action) => ({
    ...state,
    loading: loadingStatus.READY,
    data: [
      ...state.data.filter(sample =>
        sample &&
        sample.id &&
        sample.id === action.payload.sample.id
      ),
      action.payload.sample,
    ],
  }),
  [actions.fetchSampleFailed]: (state, action) => ({
    ...state,
    errorMessage: action.payload.errorMessage,
    loading: loadingStatus.ERROR,
  }),
  [actions.deleteIdeaSample]: (state, action) => ({
    ...state,
    loading: loadingStatus.LOADING,
  }),
  [actions.deleteIdeaSampleSuccess]: (state, action) => ({
    ...state,
    data: [
      ...state.data.filter(sample => sample.id !== action.payload.sampleId),
    ],
    loading: loadingStatus.READY,
  }),
  [actions.deleteIdeaSampleFailed]: (state, action) => ({
    ...state,
    loading: loadingStatus.ERROR,
    errorMessage: action.payload.errorMessage,
  }),
}, INIT_STATE)

export default ideaSamplesReducer