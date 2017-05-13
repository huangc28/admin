import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'

import * as actions from '../actions/ideaComment'
import * as APIS from '../apis/ideaComment'

export function * watchFetchIdeaCommentflow (action) {
  const { ideaId } = action.payload

  try {
    const response = yield call(APIS.fetchIdeaComment, ideaId)

    console.log('watchFetchIdeaCommentflow', response)

    // if (response.error) {
    //   throw new Error(response.error.message)
    // }

    // yield put(actions.fetchIdeaCommentSuccess(ideaId, response.content))
  } catch (err) {
    yield put(actions.fetchIdeaCommentFailed(err.message))
  }
}

export default function * ideaCommentFlow () {
  yield [
    takeLatest(actions.fetchIdeaComment().type, watchFetchIdeaCommentflow),
  ]
}