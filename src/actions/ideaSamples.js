import { createActions } from 'redux-actions'

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