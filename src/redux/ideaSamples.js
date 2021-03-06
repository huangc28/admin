import {
    handleActions,
    createActions,
} from 'redux-actions'

import * as loadingStatus from '../constants/loadingState'
import * as sampleStatus from '../constants/ideaSamples'

export const FETCH_SAMPLES = 'FETCH_SAMPLES'
export const FETCH_SAMPLES_SUCCESS = 'FETCH_SAMPLES_SUCCESS'
export const FETCH_SAMPLES_FAILED = 'FETCH_SAMPLES_FAILED'

export const FETCH_SAMPLE = 'FETCH_SAMPLE'
export const FETCH_SAMPLE_SUCCESS = 'FETCH_SAMPLE_SUCCESS'
export const FETCH_SAMPLE_FAILED = 'FETCH_SAMPLE_FAILED'

export const EDIT_IDEA_SAMPLE = 'EDIT_IDEA_SAMPLE'
export const EDIT_IDEA_SAMPLE_SUCCESS = 'EDIT_IDEA_SAMPLE_SUCCESS'
export const EDIT_IDEA_SAMPLE_FAILED = 'EDIT_IDEA_SAMPLE_FAILED'

export const SAVE_IDEA_SAMPLE = 'SAVE_IDEA_SAMPLE'
export const SAVE_IDEA_SAMPLE_SUCCESS = 'SAVE_IDEA_SAMPLE_SUCCESS'
export const SAVE_IDEA_SAMPLE_FAILED = 'SAVE_IDEA_SAMPLE_FAILED'

export const DELETE_IDEA_SAMPLE = 'DELETE_IDEA_SAMPLE'
export const DELETE_IDEA_SAMPLE_SUCCESS = 'DELETE_IDEA_SAMPLE_SUCCESS'
export const DELETE_IDEA_SAMPLE_FAILED = 'DELETE_IDEA_SAMPLE_FAILED'

export const APPROVE_IDEA_SAMPLE = 'APPROVE_IDEA_SAMPLE'
export const APPROVE_IDEA_SAMPLE_SUCCESS = 'APPROVE_IDEA_SAMPLE_SUCCESS'
export const APPROVE_IDEA_SAMPLE_FAILED = 'APPROVE_IDEA_SAMPLE_FAILED'

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
  approveIdeaSample,
  approveIdeaSampleSuccess,
  approveIdeaSampleFailed,
} = createActions({
  [FETCH_SAMPLES]: ideaId => ({
    ideaId,
  }),
  [FETCH_SAMPLES_SUCCESS]: samples => ({
    samples,
  }),
  [FETCH_SAMPLES_FAILED]: errorMessage => ({
    errorMessage,
  }),

  [FETCH_SAMPLE]: sampleId => ({
    sampleId,
  }),

  [FETCH_SAMPLE_SUCCESS]: sample => ({
    sample,
  }),

  [FETCH_SAMPLE_FAILED]: errorMessage => ({
    errorMessage,
  }),

  /**
   * @param {Object} ideaSample
   */
  [EDIT_IDEA_SAMPLE]: ideaSample => ({
    ideaSample,
  }),

  /**
   * @param {Object} ideaSample
   */
  [EDIT_IDEA_SAMPLE_SUCCESS]: ideaSample => ({
    ideaSample,
  }),

  /**
   * @param {String} errorMessage
   */
  [EDIT_IDEA_SAMPLE_FAILED]: errorMessage => ({
    errorMessage,
  }),

  /**
   * @param {Object} ideaSample
   */
  [SAVE_IDEA_SAMPLE]: ideaSample => ({
    ideaSample,
  }),
  [SAVE_IDEA_SAMPLE_SUCCESS]: ideaSample => ({
    ideaSample,
  }),
  [SAVE_IDEA_SAMPLE_FAILED]: errorMessage => ({
    errorMessage,
  }),

  [DELETE_IDEA_SAMPLE]: sampleId => ({
    sampleId,
  }),

  [DELETE_IDEA_SAMPLE_SUCCESS]: sampleId => ({
    sampleId,
  }),

  [DELETE_IDEA_SAMPLE_FAILED]: errorMessage => ({
    errorMessage,
  }),

  [APPROVE_IDEA_SAMPLE]: id => ({
    id,
  }),

  [APPROVE_IDEA_SAMPLE_SUCCESS]: id => ({
    id,
  }),

  [APPROVE_IDEA_SAMPLE_FAILED]: errorMessage => ({
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
  [approveIdeaSample]: (state, action) => ({
    ...state,
    loading: loadingStatus.LOADING,
  }),
  [approveIdeaSampleSuccess]: (state, action) => ({
    ...state,
    loading: loadingStatus.READY,
    // find the matched sample id, set status to approve, set the rest to disabled.
    data: [
      ...state.data.map(sample => {
        if (sample.id === action.payload.id) {
          return {
            ...sample,
            status: sampleStatus.IDEA_SAMPLE_APPROVE,
          }
        }

        return {
          ...sample,
          status: sampleStatus.IDEA_SAMPLE_DISABLED,
        }
      }),
    ],
  }),
  [approveIdeaSampleFailed]: (state, action) => ({
    ...state,
    loading: loadingStatus.ERROR,
    errorMessage: action.payload.errorMessage,
  }),
}, INIT_STATE)

export default ideaSamplesReducer