import {
    createActions,
    handleActions,
} from 'redux-actions'

import * as loadingStatus from '../constants/loadingState'
import * as ideaStatus from '../constants/ideas'

export const {
  getIdeas,
  getIdeasSuccess,
  getIdeasFailed,
  getIdea,
  getIdeaSuccess,
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
  GET_IDEAS: queries => ({
    queries,
  }),
  GET_IDEAS_SUCCESS: ideasData => ({ ideasData }),
  GET_IDEAS_FAILED: errorMessage => ({ errorMessage }),
  GET_IDEA: id => ({ id }),
  GET_IDEA_SUCCESS: idea => ({ idea }),
  GET_IDEA_FAILED: errorMessage => ({ errorMessage }),
  SAVE_IDEA: formData => ({ formData }),
  SAVE_IDEA_SUCCESS: formData => ({ formData }),
  SAVE_IDEA_FAILED: errorMessage => ({ errorMessage }),
  EDIT_IDEA: formData => ({ formData }),
  EDIT_IDEA_SUCCESS: formData => ({ formData }),
  EDIT_IDEA_FAILED: errorMessage => ({ errorMessage }),
  SAVE_AND_SUBMIT_IDEA: formData => ({ formData }),
  SAVE_AND_SUBMIT_IDEA_SUCCESS: formData => ({ formData }),
  SAVE_AND_SUBMIT_IDEA_FAILED: errorMessage => ({ errorMessage }),
  DELETE_IDEA: id => ({ id }),
  DELETE_IDEA_SUCCESS: id => ({ id }),
  DELETE_IDEA_FAILED: errorMessage => ({ errorMessage }),
  REJECT_IDEA: ideaId => ({ ideaId }),
  APPROVE_IDEA: ideaId => ({ ideaId }),
})

/**
 * Reducer
 */
const INIT_STATE = {
  status: ideaStatus.ALL,
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
    const { data, status } = action.payload.ideasData

    return {
      ...state,
      data,
      status,
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
