import { call, put, takeLatest, all } from 'redux-saga/effects'
import { browserHistory } from 'react-router'

import * as APIS from '../apis/ideas'
import * as actions from '../redux/ideas'
import { storeImage } from '../redux/photo'
import { storeInitFormData } from '../redux/initFormData'
import {
  PENDING,
  NEW,
  REJECT,
  APPROVE,
} from '../constants/ideas'

/**
 * Fetch ideas from server
 */
export function * watchGetIdeasFlow (action) {
  const {
    queries: {
      status,
      searchText,
      page,
      perpage,
    },
  } = action.payload

  try {
    const ideas = yield call(APIS.getIdeas, {
      status,
      searchText,
      page,
      perpage,
    })

    if (ideas.error) {
      throw Error(ideas.message)
    }

    yield put(actions.getIdeasSuccess(
      {
        ...ideas,
        status,
      })
    )
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

    yield put(storeImage(idea.data.image))
  } catch (e) {
    yield put(actions.getIdeaFailed(e.message))
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

    browserHistory.push('/erp/procurement/ideas')
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
    Object.assign(formData, { status: NEW })

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
    Object.assign(formData, { status: PENDING })

    const result = yield call(APIS.editIdea, formData)

    if (result.error) {
      throw new Error(result.error.message)
    }

    yield put(actions.editIdeaSuccess(result.data))

    // redirect to list page
    browserHistory.push(`/erp/procurement/ideas/${result.data.id}`)
  } catch (err) {
    yield put(actions.editIdeaFailed(err.message))
  }
}

export function * watchRejectIdeaFlow (action) {
  const { ideaId } = action.payload

  try {
    const response = yield call(APIS.editIdea, {
      id: ideaId,
      status: REJECT,
    })

    if (response.error) {
      throw new Error(response.error.message)
    }

    yield put(actions.editIdeaSuccess(response.data))

    browserHistory.push('/erp/procurement/ideas')
  } catch (err) {
    yield put(actions.editIdeaFailed(err.message))
  }
}

export function * watchApproveIdeaFlow (action) {
  const { ideaId } = action.payload

  try {
    const response = yield call(APIS.editIdea, {
      id: ideaId,
      status: APPROVE,
    })

    if (response.error) {
      throw new Error(response.error.message)
    }

    yield put(actions.editIdeaSuccess(response.data))

    browserHistory.push('/erp/procurement/ideas')
  } catch (err) {
    yield put(actions.editIdeaFailed(err.message))
  }
}

export default function * ideasFlow () {
  yield all([
    takeLatest(actions.getIdeas().type, watchGetIdeasFlow),
    takeLatest(actions.getIdea().type, watchGetIdeaFlow),
    takeLatest(actions.deleteIdea().type, watchDeleteIdeaFlow),
    takeLatest(actions.saveIdea().type, watchSaveIdeaFlow),
    takeLatest(actions.saveAndSubmitIdea().type, watchSaveIdeaAndSubmitFlow),
    takeLatest(actions.editIdea().type, watchEditIdeaFlow),
    takeLatest(actions.rejectIdea().type, watchRejectIdeaFlow),
    takeLatest(actions.approveIdea().type, watchApproveIdeaFlow),
  ])
}
