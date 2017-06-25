import { all, takeLatest, put, call } from 'redux-saga/effects'

import * as apis from '../apis/users'
import * as actions from '../redux/users'

export function * searchUser (action) {
  const { text } = action.payload

  try {
    const response = yield call(apis.searchUsers, text)

    if (response.error) {
      throw new Error(response.error.message)
    }

    yield put(actions.searchUsersSuccess(response.data))
  } catch (error) {
    yield put(actions.searchUsersFailed(error.errorMessage))
  }
}

export default function * usersFlow () {
  yield all([
    takeLatest(actions.searchUsers().type, searchUser),
  ])
}