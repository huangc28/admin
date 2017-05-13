import { fork } from 'redux-saga/effects'

import authSaga from './auth'
import ideaCommentSaga from './ideaComment'
import ideasSaga from './ideas'

export default function * root () {
  yield [
    fork(authSaga),
    fork(ideaCommentSaga),
    fork(ideasSaga),
  ]
}
