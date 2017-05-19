import { takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { browserHistory } from 'react-router'

import * as APIS from '../apis/ideaSamples'
import * as actions from '../actions/ideaSamples'

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

export function * watchEditIdeaSampleFlow (action) {
  const { ideaSample } = action.payload

  try {
    const response = yield call(APIS.editSample, ideaSample)

    if (response.error) {
      throw new Error(response.error.message)
    }

    yield put(actions.editIdeaSampleSuccess(response.data))
  } catch (err) {
    yield put(actions.editIdeaSampleFailed(err.message))
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
    browserHistory.push(`/erp/procurement/ideas/${ideaSample.ideaId}/samples`)
  } catch (err) {
    yield put(actions.saveIdeaSampleFailed(err.message))
  }
}

export default function * ideaSamplesFlow () {
  yield [
    takeLatest(actions.fetchSamples().type, watchFetchIdeaSamplesFlow),
    takeLatest(actions.editIdeaSample().type, watchEditIdeaSampleFlow),
    takeLatest(actions.saveIdeaSample().type, watchSaveIdeaSample),
  ]
}