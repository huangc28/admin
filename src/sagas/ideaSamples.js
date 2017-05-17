import { takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

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

export default function * ideaSamplesFlow () {
  yield [
    takeLatest(actions.fetchSamples().type, watchFetchIdeaSamplesFlow),
  ]
}