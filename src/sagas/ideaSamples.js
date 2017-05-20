import { takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { browserHistory } from 'react-router'
import { storeInitFormData } from '../actions/initFormData'

import config from '../config'
import * as APIS from '../apis/ideaSamples'
import * as actions from '../actions/ideaSamples'

// @TODO should extract this to a location saga.
const getCurrentRoute = state => (
  (
    state.routing &&
    state.routing.locationBeforeTransitions &&
    state.routing.locationBeforeTransitions.pathname
  ) || ''
)

export function * watchFetchIdeaSamplesFlow (action) {
  const {
    ideaId,
  } = action.payload

  try {
    const response = yield call(APIS.fetchSamples, ideaId)

    if (response.error) {
      throw new Error(response.error.message)
    }

    yield put(actions.fetchSamplesSuccess(response.data))
  } catch (err) {
    yield put(actions.fetchSamplesFailed(err.message))
  }
}

export function * watchFetchIdeaSampleFlow (action) {
  const {
    sampleId,
  } = action.payload

  try {
    const response = yield call(APIS.fetchSample, sampleId)

    if (response.error) {
      throw new Error(response.error.message)
    }

    yield put(actions.fetchSamplesSuccess(response.data))

    yield put(storeInitFormData(response.data))
  } catch (err) {
    yield put(actions.fetchSamplesFailed(err.message))
  }
}

export function * watchEditIdeaSampleFlow (action) {
  const { ideaSample } = action.payload

  try {
    const response = yield call(APIS.editSample, ideaSample)

    if (response.error) {
      throw new Error(response.error.message)
    }

    yield put(actions.editIdeaSampleSuccess(response.data))

    browserHistory.push(
      getCurrentRoute(config.store.getState())
    )
  } catch (err) {
    yield put(actions.editIdeaSampleFailed(err.message))
  }
}

export function * watchDeleteIdeaSampleFlow (action) {
  const { sampleId } = action.payload

  try {
    const response = yield call(APIS.deleteSample, sampleId)

    if (response.error) {
      throw new Error(response.error.message)
    }

    yield put(actions.deleteIdeaSampleSuccess(sampleId))

    // get routing from config
    browserHistory.push(
      getCurrentRoute(config.store.getState())
    )
  } catch (err) {
    yield put(actions.deleteIdeaSampleFailed(err.message))
  }
}

export function * watchSaveIdeaSample (action) {
  const { ideaSample } = action.payload

  try {
    const response = yield call(APIS.saveIdeaSample, ideaSample)

    if (response.error) {
      throw new Error(response.error.message)
    }

    yield put(actions.saveIdeaSampleSuccess(ideaSample))

    // redirect to idea sample index page
    browserHistory.push(
      getCurrentRoute(config.store.getState())
    )
  } catch (err) {
    yield put(actions.saveIdeaSampleFailed(err.message))
  }
}

export default function * ideaSamplesFlow () {
  yield [
    takeLatest(actions.fetchSamples().type, watchFetchIdeaSamplesFlow),
    takeLatest(actions.fetchSample().type, watchFetchIdeaSampleFlow),
    takeLatest(actions.editIdeaSample().type, watchEditIdeaSampleFlow),
    takeLatest(actions.saveIdeaSample().type, watchSaveIdeaSample),
    takeLatest(actions.deleteIdeaSample().type, watchDeleteIdeaSampleFlow),
  ]
}