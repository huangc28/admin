import { createActions } from 'redux-actions'

export const {
  fetchSamples,
  fetchSamplesSuccess,
  fetchSamplesFailed,
  editIdeaSample,
  editIdeaSampleSuccess,
  editIdeaSampleFailed,
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
})