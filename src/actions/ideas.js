import { createActions } from 'redux-actions'

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
  GET_IDEAS: (
    status = '', // default to retrieve all
    searchText = '',
    offset = '',
    limit = '',
  ) => ({
    status,
    searchText,
    offset,
    limit,
  }),
  GET_IDEAS_SUCCESS: ideas => ({ ideas }),
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

// export const GET_IDEAS = 'GET_IDEAS'
// export const GET_IDEAS_SUCCESS = 'GET_IDEAS_SUCCESS'
// export const GET_IDEAS_FAILED = 'GET_IDEAS_FAILED'

// export const GET_IDEA = 'GET_IDEA'
// export const GET_IDEA_FAILED = 'GET_IDEA_FAILED'
// export const GET_IDEA_SUCCESS = 'GET_IDEA_SUCCESS'

// export const DELETE_IDEA = 'DELETE_IDEA'
// export const DELETE_IDEA_SUCCESS = 'DELETE_IDEA_SUCCESS'
// export const DELETE_IDEA_FAILED = 'DELETE_IDEA_FAILED'

// export const SAVE_IDEA = 'SAVE_IDEA'
// export const SAVE_IDEA_SUCCESS = 'SAVE_IDEA_SUCCESS'
// export const SAVE_IDEA_FAILED = 'SAVE_IDEA_FAILED'

// export const SAVE_AND_SUBMIT_IDEA = 'SAVE_AND_SUBMIT_IDEA'
// export const SAVE_AND_SUBMIT_IDEA_SUCCESS = 'SAVE_AND_SUBMIT_IDEA_SUCCESS'
// export const SAVE_AND_SUBMIT_IDEA_FAILED = 'SAVE_AND_SUBMIT_IDEA_FAILED'

// export const EDIT_IDEA = 'EDIT_IDEA'
// export const EDIT_IDEA_SUCCESS = 'EDIT_IDEA_SUCCESS'
// export const EDIT_IDEA_FAILED = 'EDIT_IDEA_FAILED'

// export const LOAD_IDEA = 'LOAD_IDEA'

// export const REWORK_IDEA = 'REWORK_IDEA'
// export const REWORK_IDEA_SUCCESS = 'REWORK_IDEA_SUCCESS'

// export const REJECT_IDEA = 'REJECT_IDEA'
// export const REJECT_IDEA_SUCCESS = 'REJECT_IDEA_SUCCESS'
// export const REJECT_IDEA_FAILED = 'REJECT_IDEA_FAILED'

// export const APPROVE_IDEA = 'APPROVE_IDEA'

/**
 * Get single idea.
 *
 * @param {string} id
 */
// export const getIdea = id => ({
//   type: GET_IDEA,
//   payload: {
//     id,
//   },
// })

/**
 * @param {string} errorMessage
 */
// export const getIdeaFailed = errorMessage => ({
//   type: GET_IDEA_FAILED,
//   payload: {
//     errorMessage,
//   },
// })

/**
 * @param {object} idea
 * @returns {object}
 */
// export const getIdeaSuccess = idea => ({
//   type: GET_IDEA_SUCCESS,
//   payload: {
//     idea,
//   },
// })

/**
 * @param {object} formData
 * @returns {object}
 */
// export const saveIdea = formData => ({
//   type: SAVE_IDEA,
//   payload: {
//     formData,
//   },
// })

/**
 * @param {object} formData
 * @returns {object}
 */
// export const saveIdeaSuccess = formData => ({
//   type: SAVE_IDEA_SUCCESS,
//   payload: {
//     formData,
//   },
// })

/**
 * @param {string} errorMessage
 * @returns {object}
 */
// export const saveIdeaFailed = errorMessage => ({
//   type: SAVE_IDEA_FAILED,
//   payload: {
//     errorMessage,
//   },
// })

/**
 * @param {object} formData
 * @returns {object}
 */
// export const editIdea = formData => ({
//   type: EDIT_IDEA,
//   payload: {
//     formData,
//   },
// })

// export const editIdeaSuccess = formData => ({
//   type: EDIT_IDEA_SUCCESS,
//   payload: {
//     formData,
//   },
// })

// export const editIdeaFailed = errorMessage => ({
//   type: EDIT_IDEA_FAILED,
//   payload: {
//     errorMessage,
//   },
// })

/**
 * @param {object} formData
 * @returns {object}
 */
// export const saveAndSubmitIdea = formData => ({
//   type: SAVE_AND_SUBMIT_IDEA,
//   payload: {
//     formData,
//   },
// })

/**
 * @param {object} formData
 * @returns {object}
 */
// export const saveAndSubmitIdeaSuccess = formData => ({
//   type: SAVE_AND_SUBMIT_IDEA_SUCCESS,
//   payload: {
//     formData,
//   },
// })

/**
 * @param {object} formData
 * @returns {object}
 */
// export const saveAndSubmitIdeaFailed = errorMessage => ({
//   type: SAVE_AND_SUBMIT_IDEA_FAILED,
//   payload: {
//     errorMessage,
//   },
// })

/**
 * Delete specific idea.
 *
 * @param {string} id
 */
// export const deleteIdea = id => ({
//   type: DELETE_IDEA,
//   payload: {
//     id,
//   },
// })

/**
 * Delete specific idea success.
 *
 * @param {string} id
 */
// export const deleteIdeaSuccess = id => ({
//   type: DELETE_IDEA_SUCCESS,
//   payload: {
//     id,
//   },
// })

// /**
//  * Delete specific idea failed.
//  *
//  * @param {string} errorMessage
//  */
// export const deleteIdeaFailed = errorMessage => ({
//   type: DELETE_IDEA_FAILED,
//   payload: {
//     errorMessage,
//   },
// })

/**
 * @param {String} ideaId
 */
// export const rejectIdea = ideaId => ({
//   type: REJECT_IDEA,
//   payload: {
//     ideaId,
//   },
// })

/**
 * @param {String} ideaId
 */
// export const approveIdea = ideaId => ({
//   type: APPROVE_IDEA,
//   payload: {
//     ideaId,
//   },
// })
