import { call, put, takeLatest, all } from 'redux-saga/effects'
import { browserHistory } from 'react-router'

import config from '../config'
import { getCurrentRoute } from './location'
import * as APIS from '../apis/ideaSamples'
import { storeInitFormData } from '../redux/initFormData'
import { storeImage } from '../redux/photo'
import * as actions from '../redux/ideaSamples'

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

    yield put(actions.fetchSampleSuccess(response.data))

    // append the current image onto photo reducer
    yield put(storeImage(response.data.image))

    yield put(storeInitFormData(response.data))
  } catch (err) {
    yield put(actions.fetchSampleFailed(err.message))
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

    // @TODO should extract this to a location saga.
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

export function * watchApproveIdeaSampleFlow (action) {
  const { id } = action.payload

  try {
    const response = yield call(APIS.approveIdeaSample, id)

    if (response.error) {
      throw new Error(response.error.message)
    }

    yield put(actions.approveIdeaSampleSuccess(id))

    // redirect to idea sample page.
    browserHistory.push(
      getCurrentRoute(config.store.getState())
    )
  } catch (error) {
    yield put(actions.approveIdeaSampleFailed(error.errorMessage))
  }
}

export default function * ideaSamplesFlow () {
  yield all([
    takeLatest(actions.FETCH_SAMPLES, watchFetchIdeaSamplesFlow),
    takeLatest(actions.FETCH_SAMPLE, watchFetchIdeaSampleFlow),
    takeLatest(actions.EDIT_IDEA_SAMPLE, watchEditIdeaSampleFlow),
    takeLatest(actions.SAVE_IDEA_SAMPLE, watchSaveIdeaSample),
    takeLatest(actions.DELETE_IDEA_SAMPLE, watchDeleteIdeaSampleFlow),
    takeLatest(actions.APPROVE_IDEA_SAMPLE, watchApproveIdeaSampleFlow),
  ])
}