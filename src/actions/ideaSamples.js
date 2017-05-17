import { createActions } from 'redux-actions'

export const {
  fetchSamples,
  fetchSamplesSuccess,
  fetchSamplesFailed,
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
})