export const SORT_IDEAS = 'SORT_IDEAS'
export const GET_IDEAS = 'GET_IDEAS'
export const STORE_IDEAS = 'STORE_IDEAS'
export const GET_IDEA = 'GET_IDEA'
export const DELETE_IDEA = 'DELETE_IDEA'
export const DELETE_IDEA_SUCCESS = 'DELETE_IDEA_SUCCESS'
export const DELETE_IDEA_FAILED = 'DELETE_IDEA_FAILED'

export const LOAD_IDEA = 'LOAD_IDEA'

/**
 * @param {string} sortType
 * @returns {object}
 */
export const sortIdeasByType = sortType => ({
  type: SORT_IDEAS,
  payload: {
    sortType,
  },
})

/**
 * Fetch all ideas from server
 *
 * @returns {object}
 */
export const getIdeas = () => ({ type: GET_IDEAS })

/**
 * @param {string} id
 * @returns {object}
 *
 */
export const getIdea = id => ({
  type: GET_IDEA,
  payload: {
    id,
  },
})

/**
 * @param {array} ideas
 * @returns {object}
 */
export const storeIdeas = ideas => ({
  type: STORE_IDEAS,
  payload: {
    ideas,
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

