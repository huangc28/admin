import {
    createActions,
    handleActions,
} from 'redux-actions'

import * as loadingStatus from '../constants/loadingState'
import * as ideaStatus from '../constants/ideas'

export const GET_IDEAS = 'GET_IDEAS'
export const GET_IDEAS_SUCCESS = 'GET_IDEAS_SUCCESS'
export const GET_IDEAS_FAILED = 'GET_IDEAS_FAILED'

export const GET_IDEA = 'GET_IDEA'
export const GET_IDEA_SUCCESS = 'GET_IDEA_SUCCESS'
export const GET_IDEA_FAILED = 'GET_IDEA_FAILED'

export const SAVE_IDEA = 'SAVE_IDEA'
export const SAVE_IDEA_SUCCESS = 'SAVE_IDEA_SUCCESS'
export const SAVE_IDEA_FAILED = 'SAVE_IDEA_FAILED'

export const EDIT_IDEA = 'EDIT_IDEA'
export const EDIT_IDEA_SUCCESS = 'EDIT_IDEA_SUCCESS'
export const EDIT_IDEA_FAILED = 'EDIT_IDEA_FAILED'

export const SAVE_AND_SUBMIT_IDEA = 'SAVE_AND_SUBMIT_IDEA'
export const SAVE_AND_SUBMIT_IDEA_SUCCESS = 'SAVE_AND_SUBMIT_IDEA_SUCCESS'
export const SAVE_AND_SUBMIT_IDEA_FAILED = 'SAVE_AND_SUBMIT_IDEA_FAILED'

export const DELETE_IDEA = 'DELETE_IDEA'
export const DELETE_IDEA_SUCCESS = 'DELETE_IDEA_SUCCESS'
export const DELETE_IDEA_FAILED = 'DELETE_IDEA_FAILED'

export const REJECT_IDEA = 'REJECT_IDEA'
export const APPROVE_IDEA = 'APPROVE_IDEA'

export const {
  getIdeas,
  getIdeasSuccess,
  getIdeasFailed,
  getIdea,
  getIdeaSuccess,
  getIdeaFailed,
  saveIdea,
  saveIdeaSuccess,
  saveIdeaFailed,
  editIdea,
  editIdeaSuccess,
  editIdeaFailed,
  saveAndSubmitIdea,
  saveAndSubmitIdeaSuccess,
  saveAndSubmitIdeaFailed,
  deleteIdea,
  deleteIdeaSuccess,
  deleteIdeaFailed,
  rejectIdea,
  approveIdea,
} = createActions({
  [GET_IDEAS]: queries => ({
    queries,
  }),
  [GET_IDEAS_SUCCESS]: ideasData => ({ ideasData }),
  [GET_IDEAS_FAILED]: errorMessage => ({ errorMessage }),
  [GET_IDEA]: id => ({ id }),
  [GET_IDEA_SUCCESS]: idea => ({ idea }),
  [GET_IDEA_FAILED]: errorMessage => ({ errorMessage }),
  [SAVE_IDEA]: formData => ({ formData }),
  [SAVE_IDEA_SUCCESS]: formData => ({ formData }),
  [SAVE_IDEA_FAILED]: errorMessage => ({ errorMessage }),
  [EDIT_IDEA]: formData => ({ formData }),
  [EDIT_IDEA_SUCCESS]: formData => ({ formData }),
  [EDIT_IDEA_FAILED]: errorMessage => ({ errorMessage }),
  [SAVE_AND_SUBMIT_IDEA]: formData => ({ formData }),
  [SAVE_AND_SUBMIT_IDEA_SUCCESS]: formData => ({ formData }),
  [SAVE_AND_SUBMIT_IDEA_FAILED]: errorMessage => ({ errorMessage }),
  [DELETE_IDEA]: id => ({ id }),
  [DELETE_IDEA_SUCCESS]: id => ({ id }),
  [DELETE_IDEA_FAILED]: errorMessage => ({ errorMessage }),
  [REJECT_IDEA]: ideaId => ({ ideaId }),
  [APPROVE_IDEA]: ideaId => ({ ideaId }),
})

/**
 * Reducer
 */
const INIT_STATE = {
  status: ideaStatus.ALL,
  total: 0,
  data: [],
  errorMessage: null,
  loading: loadingStatus.EMPTY,
}

const ideasReducer = handleActions({
  [getIdeas]: (state, action) => ({
    ...state,
    loading: loadingStatus.LOADING,
    status: action.payload.status,
  }),
  [getIdeasSuccess]: (state, action) => {
    const {
      data,
      status,
      total,
    } = action.payload.ideasData

    return {
      ...state,
      data,
      status,
      total,
      loading: loadingStatus.READY,
    }
  },
  [getIdeasFailed]: (state, action) => ({
    ...state,
    errorMessage: action.payload.errorMessage,
  }),
  [deleteIdeaSuccess]: (state, action) => ({
    ...state,
    data: state.data.filter(idea => idea.id !== action.payload.id),
  }),
  [deleteIdeaFailed]: (state, action) => ({
    ...state,
    errorMessage: action.payload.errorMessage,
  }),
  [saveIdeaSuccess]: (state, action) => ({
    ...state,
    data: [
      ...state.data,
      action.payload.formData,
    ],
  }),
  [saveIdeaFailed]: (state, action) => ({
    ...state,
    errorMessage: action.payload.errorMessage,
  }),
  [editIdeaSuccess]: (state, action) => ({
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
  [editIdeaFailed]: (state, action) => ({
    ...state,
    loading: loadingStatus.ERROR,
    errorMessage: action.payload.errorMessage,
  }),
  [getIdeaSuccess]: (state, action) => ({
    ...state,
    data: [
      ...state.data.filter(idea => idea.id !== action.payload.idea.id),
      action.payload.idea,
    ],
  }),
  [getIdeaFailed]: (state, action) => ({
    ...state,
    errorMessage: action.payload.errorMessage,
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
