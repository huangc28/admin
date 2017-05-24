import { takeLatest, all, call, put } from 'redux-saga/effects'
import * as APIS from '../apis/photo'

import * as actions from '../actions/photo'

function * watchUploadFileFlow (action) {
  const { file } = action.payload

  try {
    const formData = new FormData()

    formData.append('image', file)

    const response = yield call(APIS.uploadPhoto, formData)

    if (response.error) {
      throw new Error(response.error.message)
    }

    yield put(actions.uploadPhotoSuccess(response.data.image))
  } catch (err) {
    yield put(actions.uploadPhotoFailed(err.message))
  }
}

export default function * photoFlow () {
  yield all([
    takeLatest(actions.uploadPhoto().type, watchUploadFileFlow),
  ])
}