import { handleActions } from 'redux-actions'

import * as loadingStatus from '../constants/loadingState'
import * as actions from '../actions/ideas'

const INIT_STATE = {
  status: null,
  data: [],
  errorMessage: null,
  loading: loadingStatus.EMPTY,
}

const ideasReducer = handleActions({
  [actions.getIdeas]: (state, action) => ({
    ...state,
    loading: loadingStatus.LOADING,
  }),
  [actions.getIdeasSuccess]: (state, action) => ({
    ...state,
    data: action.payload.ideas,
    loading: loadingStatus.READY,
  }),
  [actions.getIdeasFailed]: (state, action) => ({
    ...state,
    errorMessage: action.payload.errorMessage,
  }),
  [actions.deleteIdeaSuccess]: (state, action) => ({
    ...state,
    data: state.data.filter(idea => idea.id !== action.payload.id),
  }),
  [actions.deleteIdeaFailed]: (state, action) => ({
    ...state,
    errorMessage: action.payload.errorMessage,
  }),
  [actions.saveIdeaSuccess]: (state, action) => ({
    ...state,
    data: [
      ...state.data,
      action.payload.formData,
    ],
  }),
  [actions.saveIdeaFailed]: (state, action) => ({
    ...state,
    errorMessage: action.payload.errorMessage,
  }),
  [actions.editIdeaSuccess]: (state, action) => ({
    ...state,
    loading: loadingStatus.LOADING,
    // find data that matches the id and replace the data object
    data: state.data.map(formData => {
      if (formData.id === action.payload.formData.id) {
        return action.payload.formData
      }

      return formData
    }),
  }),
  [actions.editIdeaFailed]: (state, action) => ({
    ...state,
    loading: loadingStatus.ERROR,
    errorMessage: action.payload.errorMessage,
  }),
  [actions.getIdeaSuccess]: (state, action) => ({
    ...state,
    data: [
      ...state.data.filter(idea => idea.id !== action.payload.idea.id),
      action.payload.idea,
    ],
  }),
}, INIT_STATE)

export default ideasReducer

/**
 * Get all ideas
 *
 * @param {object} state
 */
export const getAllIdeas = state => state.ideas.data

/**
 * @param {object} state
 * @param {number} id
 * @returns {object}
 */
export const ideaSelector = (state, id) => (
  (
    state.ideas.data &&
    state.ideas.data.find(idea => idea.id && idea.id === id)
  ) || null
)

/**
 * @param {object} state
 * @param {number} id
 * @returns {string} || null
 */
export const getIdeaComment = (state, id) => {
  const idea = ideaSelector(state, parseInt(id, 10))

  return (idea && idea.comment) || ''
}

export const getIdeaStatus = (state, id) => {
  const idea = ideaSelector(state, parseInt(id, 10))

  return idea && idea.status
}

