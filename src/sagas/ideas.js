import { takeLatest } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import { browserHistory } from 'react-router'

import * as APIS from '../apis/ideas'
import * as actions from '../actions/ideas'
import { getAllIdeas } from '../reducers/ideas'
import { storeInitFormData } from '../actions/initFormData'
import {
  SORT_BY_PENDING,
  SORT_BY_NEW,
} from '../constants/ideas'

/**
 * Fetch ideas from server
 */
export function * watchGetIdeasFlow (action) {
  const {
    status,
    searchText,
    offset,
    limit,
  } = action.payload

  try {
    const ideas = yield call(APIS.getIdeas, {
      status,
      searchText,
      offset,
      limit,
    })

    if (ideas.error) {
      throw Error(ideas.message)
    }

    yield put(actions.getIdeasSuccess(ideas.data))
  } catch (err) {
    yield put(actions.getIdeasFailed(err.message))
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

    yield put(actions.getIdeaSuccess(idea.data))

    // @TODO api has not been fixed yet, still in camel case.
    yield put(storeInitFormData(idea.data))
  } catch (e) {
    yield put(actions.getIdeaFailed(e.message))
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
    // redirect to previous route
    browserHistory.push('/erp/procurement/ideas')
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

    browserHistory.push(`/erp/procurement/ideas/${response.data.id}/edit`)
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
    Object.assign(formData, { status: SORT_BY_NEW })

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
    // merge idea status with formData
    Object.assign(formData, { status: SORT_BY_PENDING })

    const result = yield call(APIS.saveIdea, formData)

    if (result.error) {
      throw new Error(result.error.message)
    }

    yield put(actions.saveAndSubmitIdeaSuccess(result.data))

    // redirect to list page
    browserHistory.push(`/erp/procurement/ideas/${result.data.id}`)
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
