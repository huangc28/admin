import { call, put, all, takeLatest } from 'redux-saga/effects'
import { browserHistory } from 'react-router'

import { AUTH } from '../constants/auth'
import * as APIS from '../apis/auth'
import * as actions from '../redux/auth'

export function * watchLoginFlow (action) {
  const { payload: { phone, password } } = action

  try {
    const response = yield call(APIS.authorize, phone, password)

    if (response.error) {
      throw new Error(response.error.message)
    }

    const {
      access_token: accessToken,
      username,
    } = response

    // store token into redux store
    yield put(actions.loginSuccess(
      {
        accessToken,
        username,
      }
    ))

    // store following things into session storage
    // 1. accessToken
    // 2. username
    sessionStorage.setItem(AUTH, JSON.stringify({
      accessToken,
      username,
    }))

    // redirect to dashboard page
    browserHistory.push('/erp')
  } catch (err) {
    yield put(actions.loginFailed(err.message))
  }
}

export function * watchLogoutFlow () {
  yield put(actions.clearAccessToken())

  sessionStorage.removeItem(AUTH)

  browserHistory.push('/login')
}

export default function * () {
  yield all([
    takeLatest(actions.login().type, watchLoginFlow),
    takeLatest(actions.logout().type, watchLogoutFlow),
    takeLatest(actions.accessTokenUnauthorized().type, watchLogoutFlow),
  ])
}