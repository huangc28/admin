import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import { browserHistory } from 'react-router'

import * as actions from '../actions/ideaComment'
import * as APIS from '../apis/ideaComment'

export function * watchFetchIdeaCommentflow (action) {
  const { ideaId } = action.payload

  try {
    const response = yield call(APIS.fetchIdeaComment, ideaId)

    if (response.error) {
      throw new Error(response.error.message)
    }

    yield put(actions.fetchIdeaCommentSuccess(ideaId, response.data[0]))
  } catch (err) {
    yield put(actions.fetchIdeaCommentFailed(err.message))
  }
}

export function * watchReworkIdeaFlow (action) {
  const { id, content } = action.payload

  try {
    const response = yield call(APIS.reworkIdea, id, content)

    if (response.error) {
      throw new Error(response.error.message)
    }

    // put the comments into relative idea.
    yield put(actions.reworkIdeaSuccess(response.data))

    browserHistory.push('/erp/procurement/ideas')
  } catch (err) {
    yield put(actions.reworkIdeaFailed(err.message))
  }
}

export default function * ideaCommentFlow () {
  yield [
    takeLatest(actions.fetchIdeaComment().type, watchFetchIdeaCommentflow),
    takeLatest(actions.reworkIdea().type, watchReworkIdeaFlow),
  ]
}