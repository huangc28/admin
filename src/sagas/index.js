import { fork } from 'redux-saga/effects'

import authSaga from './auth'
import ideaCommentSaga from './ideaComment'
import ideaSampleSaga from './ideaSamples'
import ideasSaga from './ideas'

export default function * root () {
  yield [
    fork(authSaga),
    fork(ideaSampleSaga),
    fork(ideaCommentSaga),
    fork(ideasSaga),
  ]
}
