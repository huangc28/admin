import { fork } from 'redux-saga/effects'

import authSaga from './auth'
import ideasSaga from './ideas'

export default function * root () {
  yield [
    fork(authSaga),
    fork(ideasSaga),
  ]
}
