import {
    handleActions,
    createActions,
} from 'redux-actions'

import * as loadingStatus from '../constants/loadingState'

export const {
  fetchSamples,
  fetchSamplesSuccess,
  fetchSamplesFailed,
  fetchSample,
  fetchSampleSuccess,
  fetchSampleFailed,
  editIdeaSample,
  editIdeaSampleSuccess,
  editIdeaSampleFailed,
  saveIdeaSample,
  saveIdeaSampleSuccess,
  saveIdeaSampleFailed,
  deleteIdeaSample,
  deleteIdeaSampleSuccess,
  deleteIdeaSampleFailed,
} = createActions({
  FETCH_SAMPLES: ideaId => ({
    ideaId,
  }),
  FETCH_SAMPLES_SUCCESS: samples => ({
    samples,
  }),
  FETCH_SAMPLES_FAILED: errorMessage => ({
    errorMessage,
  }),

  FETCH_SAMPLE: sampleId => ({
    sampleId,
  }),

  FETCH_SAMPLE_SUCCESS: sample => ({
    sample,
  }),

  FETCH_SAMPLE_FAILED: errorMessage => ({
    errorMessage,
  }),

  /**
   * @param {Object} ideaSample
   */
  EDIT_IDEA_SAMPLE: ideaSample => ({
    ideaSample,
  }),

  /**
   * @param {Object} ideaSample
   */
  EDIT_IDEA_SAMPLE_SUCCESS: ideaSample => ({
    ideaSample,
  }),

  /**
   * @param {String} errorMessage
   */
  EDIT_IDEA_SAMPLE_FAILED: errorMessage => ({
    errorMessage,
  }),

  /**
   * @param {Object} ideaSample
   */
  SAVE_IDEA_SAMPLE: ideaSample => ({
    ideaSample,
  }),
  SAVE_IDEA_SAMPLE_SUCCESS: ideaSample => ({
    ideaSample,
  }),
  SAVE_IDEA_SAMPLE_FAILED: errorMessage => ({
    errorMessage,
  }),

  DELETE_IDEA_SAMPLE: sampleId => ({
    sampleId,
  }),

  DELETE_IDEA_SAMPLE_SUCCESS: sampleId => ({
    sampleId,
  }),

  DELETE_IDEA_SAMPLE_FAILED: errorMessage => ({
    errorMessage,
  }),
})

/**
 * Reducer
 */

const INIT_STATE = {
  loading: loadingStatus.EMPTY,
  errorMessage: null,
  data: [],
}

const ideaSamplesReducer = handleActions({
  [fetchSamples]: (state, action) => ({
    ...state,
    loading: loadingStatus.LOADING,
  }),
  [fetchSamplesSuccess]: (state, action) => ({
    ...state,
    data: [
      ...action.payload.samples,
    ],
    loading: loadingStatus.READY,
  }),
  [fetchSamplesFailed]: (state, action) => ({
    ...state,
    loading: loadingStatus.ERROR,
    errorMessage: action.payload.errorMessage,
  }),
  [editIdeaSample]: (state, action) => ({
    ...state,
    loading: loadingStatus.LOADING,
  }),
  [editIdeaSampleSuccess]: (state, action) => ({
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
  [editIdeaSampleFailed]: (state, action) => ({
    ...state,
    loading: loadingStatus.ERROR,
    errorMessage: action.payload.errorMessage,
  }),
  [saveIdeaSample]: (state, action) => ({
    ...state,
    loading: loadingStatus.LOADING,
  }),
  [saveIdeaSampleSuccess]: (state, action) => ({
    ...state,
    data: [
      ...state.data,
      action.payload.ideaSample,
    ],
    loading: loadingStatus.READY,
  }),
  [saveIdeaSampleFailed]: (state, action) => ({
    ...state,
    errorMessage: action.payload.errorMessage,
    loading: loadingStatus.ERROR,
  }),
  [fetchSample]: (state, action) => ({
    ...state,
    loading: loadingStatus.LOADING,
  }),
  [fetchSampleSuccess]: (state, action) => ({
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
  [fetchSampleFailed]: (state, action) => ({
    ...state,
    errorMessage: action.payload.errorMessage,
    loading: loadingStatus.ERROR,
  }),
  [deleteIdeaSample]: (state, action) => ({
    ...state,
    loading: loadingStatus.LOADING,
  }),
  [deleteIdeaSampleSuccess]: (state, action) => ({
    ...state,
    data: [
      ...state.data.filter(sample => sample.id !== action.payload.sampleId),
    ],
    loading: loadingStatus.READY,
  }),
  [deleteIdeaSampleFailed]: (state, action) => ({
    ...state,
    loading: loadingStatus.ERROR,
    errorMessage: action.payload.errorMessage,
  }),
}, INIT_STATE)

export default ideaSamplesReducer