import { call, fork, put, take, cancel } from 'redux-saga/effects'
import { browserHistory } from 'react-router'

import { ACCESS_TOKEN } from '../constants/auth'
import * as APIS from '../apis/auth'
import * as actions from '../actions/auth'

export function * authorize (email, password) {
  try {
    const response = yield call(APIS.authorize, email, password)

    if (response.error) {
      throw new Error(response.error.message)
    }

    // store token into redux store
    yield put(actions.loginSuccess(response.access_token))

    // store token into session storage
    sessionStorage.setItem(ACCESS_TOKEN, response.access_token)

    // redirect to dashboard page
    browserHistory.push('/erp')
  } catch (err) {
    yield put(actions.loginFailed(err.message))
  }
}

export function * watchLoginFlow () {
  while (true) {
    const { payload: { email, password } } = yield take(actions.login().type)

    // fork authorize action
    const task = yield fork(authorize, email, password)

    const loginFailedAction = yield take([
      actions.loginFailed().type,
      actions.logout().type,
    ])

    console.log('trigger watchLoginFlow', loginFailedAction)

    if (loginFailedAction.type === actions.logout().type) {
      yield cancel(task)
      // remove api token from both redux store and session storage.
    }
  }
}

export default function * () {
  yield [
    fork(watchLoginFlow),
  ]
}