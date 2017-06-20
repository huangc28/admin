import {
  createActions,
  handleActions,
} from 'redux-actions'

import * as loadingStatus from '../constants/loadingState'

export const {
  createSupply,
  createSupplySuccess,
  createSupplyFailed,
  searchSupply,
  searchSupplySuccess,
  searchSupplyFailed,
  appendSupplySearchResults,
} = createActions({
  CREATE_SUPPLY: supply => ({
    supply,
  }),
  CREATE_SUPPLY_SUCCESS: supply => ({
    supply,
  }),
  CREATE_SUPPLY_FAILED: errorMessage => ({
    errorMessage,
  }),
  SEARCH_SUPPLY: (supplierId, name) => ({
    supplierId,
    name,
  }),
  SEARCH_SUPPLY_SUCCESS: searchResult => ({
    searchResult,
  }),
  SEARCH_SUPPLY_FAILED: errorMessage => ({
    errorMessage,
  }),

  /**
   * @param {Array} results
   */
  APPEND_SUPPLY_SEARCH_RESULTS: results => ({
    results,
  }),
})

const INITIAL_STATE = {
  searchResult: [],
  loading: loadingStatus.EMPTY,
}

const reducer = handleActions({
  [searchSupply]: (state, action) => ({
    ...state,
    loading: loadingStatus.LOADING,
  }),
  [searchSupplySuccess]: (state, action) => ({
    ...state,
    searchResult: action.payload.searchResult,
    loading: loadingStatus.READY,
  }),
  [searchSupplyFailed]: (state, action) => ({
    ...state,
    errorMessage: action.payload.errorMessage,
  }),
  [appendSupplySearchResults]: (state, action) => ({
    ...state,
    searchResult: state.searchResult.concat(
      action.payload.results
    ),
  }),
}, INITIAL_STATE)

export default reducer

export const getSupplySearchResult = state => state.supply.searchResult

export const getSupplyDataSource = state => (
  // retrieve all suppliers search result.
  getSupplySearchResult(state)
    .map(supply => supply.product_name)
)

/**
 * @param {Array} supplies
 * @param {Number} id
 * @returns {Object}
 */
export const getSupplyByProductId = (supplies, id) => {
  const matchedSupply = supplies.find(
    supply => supply.id === id
  )

  return matchedSupply || {}
}

/**
 * @param {Array} supplies
 * @param {String} text
 * @returns {Object} || null
 */
export const getSupplyByProductName = (supplies, text) => {
  const trimmedText = text.trim()

  const matchedSupply = supplies.find(
    supply => supply.product_name === trimmedText
  )

  return matchedSupply || null
}

/**
 * @param {Array} supplies
 * @param {String} text
 * @returns {Integer} || null
 */
export const getSupplyIdByProductName = (supplies, text) => {
  const supply = getSupplyByProductName(supplies, text)

  return (supply && supply.id) || null
}
