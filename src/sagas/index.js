import { all, call } from 'redux-saga/effects'

import authSaga from './auth'
import photoSaga from './photo'
import ideaCommentSaga from './ideaComment'
import ideaSampleSaga from './ideaSamples'
import ideasSaga from './ideas'
import purchaseOrderSaga from './purchaseOrder'
import suppilers from './suppliers'
import supply from './supply'
import users from './users'

export default function * root () {
  yield all([
    call(authSaga),
    call(photoSaga),
    call(ideaSampleSaga),
    call(ideaCommentSaga),
    call(ideasSaga),
    call(purchaseOrderSaga),
    call(suppilers),
    call(supply),
    call(users),
  ])
}
