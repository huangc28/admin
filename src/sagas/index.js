import { fork } from 'redux-saga/effects'

import ideasSaga from './ideas'

export default function * root () {
  yield [
    fork(ideasSaga),
  ]
}
