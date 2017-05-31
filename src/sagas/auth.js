import { call, put, all, takeLatest } from 'redux-saga/effects'
import { browserHistory } from 'react-router'

import { ACCESS_TOKEN } from '../constants/auth'
import * as APIS from '../apis/auth'
import * as actions from '../redux/auth'

export function * watchLoginFlow (action) {
  const { payload: { email, password } } = action

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

export function * watchLogoutFlow () {
  yield put(actions.clearAccessToken())

  sessionStorage.removeItem(ACCESS_TOKEN)

  browserHistory.push('/login')
}

export default function * () {
  yield all([
    takeLatest(actions.login().type, watchLoginFlow),
    takeLatest(actions.logout().type, watchLogoutFlow),
    takeLatest(actions.accessTokenUnauthorized().type, watchLogoutFlow),
  ])
}