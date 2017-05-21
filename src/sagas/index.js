import { all, call } from 'redux-saga/effects'

import authSaga from './auth'
import ideaCommentSaga from './ideaComment'
import ideaSampleSaga from './ideaSamples'
import ideasSaga from './ideas'

export default function * root () {
  yield all([
    call(authSaga),
    call(ideaSampleSaga),
    call(ideaCommentSaga),
    call(ideasSaga),
  ])
}
