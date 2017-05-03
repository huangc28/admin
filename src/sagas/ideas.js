import { takeLatest } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import { browserHistory } from 'react-router'

import * as APIS from '../apis/ideas'
import * as actions from '../actions/ideas'
import { storeInitFormData } from '../actions/initFormData'
import { getAllIdeas } from '../reducers/ideas'

/**
 * Fetch ideas from server
 */
export function * watchGetIdeasFlow (action) {
  try {
    const ideas = yield call(APIS.getIdeas)

    if (ideas.error) {
      throw Error(ideas.message)
    }

    yield put(actions.storeIdeas(ideas.data))
  } catch (err) {
    console.log('BRYAN: error', err.message)
  }
}

/**
 * Load specific idea from server.
 */
export function * watchGetIdeaFlow (action) {
  const { id } = action.payload

  try {
    const idea = yield call(APIS.getIdea, id)

    if (idea.error) {
      throw Error(idea.error.message)
    }

    yield put(storeInitFormData(idea))
  } catch (e) {
    console.log('BRYAN', e.message)
  }
}

/**
 * Load idea from the current state tree
 */
export function * watchLoadIdeaFlow (action) {
  // pull the data based on the id
  const ideas = yield select(getAllIdeas)

  // find the idea object that matches action.payload.id
  const initFormData = ideas.find(idea => idea.id === action.payload.id)

  if (initFormData) {
    // dispatch an action for reinitialising form data.
    yield put(storeInitFormData(initFormData))
  } else {
    // if not found in current state tree, request it from the api.
    yield put(actions.getIdea(action.payload.id))
  }
}

/**
 * Delete idea flow
 */
export function * watchDeleteIdeaFlow (action) {
  const { id } = action.payload

  try {
    const response = yield call(APIS.deleteIdea, id)

    if (response.error) {
      throw new Error(response.error.message)
    }

    // here we remove the specific idea from redux store
    yield put(actions.deleteIdeaSuccess(id))
  } catch (err) {
    yield put(actions.deleteIdeaFailed(err.message))
  }
}

/**
 * Edit idea flow.
 */
export function * watchEditIdeaFlow (action) {
  const {
    formData,
  } = action.payload

  try {
    const response = yield call(APIS.editIdea, formData)

    if (response.error) {
      throw new Error(response.error.message)
    }

    yield put(actions.editIdeaSuccess(response.data))
  } catch (err) {
    yield put(actions.editIdeaFailed(err.message))
  }
}

/**
 * Save Idea Flow.
 */
export function * watchSaveIdeaFlow (action) {
  const { formData } = action.payload

  try {
    // submit idea
    const result = yield call(APIS.saveIdea, formData)

    if (result.error) {
      throw new Error(result.error.message)
    }

    // insert into idea list.
    yield put(actions.saveIdeaSuccess(formData))

    // redirect to list page.
    browserHistory.push('/erp/procurement/ideas')
  } catch (err) {
    yield put(actions.saveIdeaFailed())
  }
}

export function * watchSaveIdeaAndSubmitFlow (action) {
  const { formData } = action.payload

  try {
    // submit idea
    const result = yield call(APIS.saveAndSubmitIdea, formData)

    if (result.error) {
      throw new Error(result.error.message)
    }

    yield put(actions.saveAndSubmitIdeaSuccess(formData))

    // redirect to list page
    browserHistory.push('/erp/procurement/ideas')
  } catch (err) {
    yield put(actions.saveAndSubmitIdeaFailed())
  }
}

export default function * ideasFlow () {
  yield [
    takeLatest(actions.GET_IDEAS, watchGetIdeasFlow),
    takeLatest(actions.GET_IDEA, watchGetIdeaFlow),
    takeLatest(actions.LOAD_IDEA, watchLoadIdeaFlow),
    takeLatest(actions.DELETE_IDEA, watchDeleteIdeaFlow),
    takeLatest(actions.SAVE_IDEA, watchSaveIdeaFlow),
    takeLatest(actions.SAVE_AND_SUBMIT_IDEA, watchSaveIdeaAndSubmitFlow),
    takeLatest(actions.EDIT_IDEA, watchEditIdeaFlow),
  ]
}
