import { takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import * as APIS from '../apis/ideas'
import * as actions from '../actions/ideas'

function * watchGetIdeasFlow (action) {
  try {
    const ideas = yield call(APIS.getIdeas)

    if (ideas.error) {
      throw Error(ideas.message)
    }

    yield put(actions.storeIdeas(ideas.data))
  } catch (err) {
    console.log('BRYAN: error', err.getMessage())
  }
}

export default function * ideasFlow () {
  yield [
    takeLatest(actions.GET_IDEAS, watchGetIdeasFlow),
  ]
}
