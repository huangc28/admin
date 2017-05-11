export const GET_IDEAS = 'GET_IDEAS'
export const GET_IDEAS_SUCCESS = 'GET_IDEAS_SUCCESS'
export const GET_IDEAS_FAILED = 'GET_IDEAS_FAILED'

export const GET_IDEA = 'GET_IDEA'
export const GET_IDEA_FAILED = 'GET_IDEA_FAILED'
export const GET_IDEA_SUCCESS = 'GET_IDEA_SUCCESS'

export const STORE_IDEAS = 'STORE_IDEAS'

export const DELETE_IDEA = 'DELETE_IDEA'
export const DELETE_IDEA_SUCCESS = 'DELETE_IDEA_SUCCESS'
export const DELETE_IDEA_FAILED = 'DELETE_IDEA_FAILED'

export const SAVE_IDEA = 'SAVE_IDEA'
export const SAVE_IDEA_SUCCESS = 'SAVE_IDEA_SUCCESS'
export const SAVE_IDEA_FAILED = 'SAVE_IDEA_FAILED'

export const SAVE_AND_SUBMIT_IDEA = 'SAVE_AND_SUBMIT_IDEA'
export const SAVE_AND_SUBMIT_IDEA_SUCCESS = 'SAVE_AND_SUBMIT_IDEA_SUCCESS'
export const SAVE_AND_SUBMIT_IDEA_FAILED = 'SAVE_AND_SUBMIT_IDEA_FAILED'

export const EDIT_IDEA = 'EDIT_IDEA'
export const EDIT_IDEA_SUCCESS = 'EDIT_IDEA_SUCCESS'
export const EDIT_IDEA_FAILED = 'EDIT_IDEA_FAILED'

export const LOAD_IDEA = 'LOAD_IDEA'

export const REWORK_IDEA = 'REWORK_IDEA'

/**
 * Fetch all ideas from server
 *
 * @param {string} status
 * @param {string} searchText
 * @param {number} offset
 * @param {number} limit
 * @returns {object}
 */
export const getIdeas = (
  {
    status = '', // default to retrieve all
    searchText = '',
    offset = '',
    limit = '',
  } = {}
) => ({
  type: GET_IDEAS,
  payload: {
    status,
    searchText,
    offset,
    limit,
  },
})

/**
 * Get single idea.
 *
 * @param {string} id
 */
export const getIdea = id => ({
  type: GET_IDEA,
  payload: {
    id,
  },
})

/**
 * @param {string} errorMessage
 */
export const getIdeaFailed = errorMessage => ({
  type: GET_IDEA_FAILED,
  payload: {
    errorMessage,
  },
})

/**
 * @param {object} idea
 * @returns {object}
 */
export const getIdeaSuccess = idea => ({
  type: GET_IDEA_SUCCESS,
  payload: {
    idea,
  },
})

/**
 * @param {array} ideas
 */
export const getIdeasSuccess = ideas => ({
  type: GET_IDEAS_SUCCESS,
  payload: {
    ideas,
  },
})

/**
 * @param {string} errorMessage
 */
export const getIdeasFailed = errorMessage => ({
  type: GET_IDEAS_FAILED,
  payload: {
    errorMessage,
  },
})

/**
 * @param {object} formData
 * @returns {object}
 */
export const saveIdea = formData => ({
  type: SAVE_IDEA,
  payload: {
    formData,
  },
})

/**
 * @param {object} formData
 * @returns {object}
 */
export const saveIdeaSuccess = formData => ({
  type: SAVE_IDEA_SUCCESS,
  payload: {
    formData,
  },
})

/**
 * @param {string} errorMessage
 * @returns {object}
 */
export const saveIdeaFailed = errorMessage => ({
  type: SAVE_IDEA_FAILED,
  payload: {
    errorMessage,
  },
})

/**
 * @param {object} formData
 * @returns {object}
 */
export const editIdea = formData => ({
  type: EDIT_IDEA,
  payload: {
    formData,
  },
})

export const editIdeaSuccess = formData => ({
  type: EDIT_IDEA_SUCCESS,
  payload: {
    formData,
  },
})

export const editIdeaFailed = errorMessage => ({
  type: EDIT_IDEA_FAILED,
  payload: {
    errorMessage,
  },
})

/**
 * @param {object} formData
 * @returns {object}
 */
export const saveAndSubmitIdea = formData => ({
  type: SAVE_AND_SUBMIT_IDEA,
  payload: {
    formData,
  },
})

/**
 * @param {object} formData
 * @returns {object}
 */
export const saveAndSubmitIdeaSuccess = formData => ({
  type: SAVE_AND_SUBMIT_IDEA_SUCCESS,
  payload: {
    formData,
  },
})

/**
 * @param {object} formData
 * @returns {object}
 */
export const saveAndSubmitIdeaFailed = errorMessage => ({
  type: SAVE_AND_SUBMIT_IDEA_FAILED,
  payload: {
    errorMessage,
  },
})

/**
 * Load specific idea and initialize form with that data.
 *
 * @param {string} id
 */
export const loadIdea = id => ({
  type: LOAD_IDEA,
  payload: {
    id,
  },
})

/**
 * Delete specific idea.
 *
 * @param {string} id
 */
export const deleteIdea = id => ({
  type: DELETE_IDEA,
  payload: {
    id,
  },
})

/**
 * Delete specific idea success.
 *
 * @param {string} id
 */
export const deleteIdeaSuccess = id => ({
  type: DELETE_IDEA_SUCCESS,
  payload: {
    id,
  },
})

/**
 * Delete specific idea failed.
 *
 * @param {string} errorMessage
 */
export const deleteIdeaFailed = errorMessage => ({
  type: DELETE_IDEA_FAILED,
  payload: {
    errorMessage,
  },
})

/**
 * @param {string} id
 * @param {string} comments
 * @returns {object}
 */
export const reworkIdea = (id, comments) => ({
  type: REWORK_IDEA,
  payload: {
    id,
    comments,
  },
})

