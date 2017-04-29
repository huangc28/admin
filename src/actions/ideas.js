export const SORT_IDEAS = 'SORT_IDEAS'
export const GET_IDEAS = 'GET_IDEAS'
export const STORE_IDEAS = 'STORE_IDEAS'

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

export const getIdeas = () => ({ type: GET_IDEAS })

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