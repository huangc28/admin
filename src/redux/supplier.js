import {
  createActions,
  handleActions,
} from 'redux-actions'

import * as loadingStatus from '../constants/loadingState'

/**
 * searchSuppliers ---> used for auto completion
 * fetchSuppliers ---> used for rendering, data manipulation
 */
export const {
  searchSuppliers,
  searchSuppliersSuccess,
  searchSuppliersFailed,
  appendSupplierSearchResults,
} = createActions({
  SEARCH_SUPPLIERS: name => ({
    name,
  }),
  SEARCH_SUPPLIERS_SUCCESS: searchResult => ({
    searchResult,
  }),
  SEARCH_SUPPLIERS_FAILED: errorMessage => ({
    errorMessage,
  }),

  /**
   * @param {Array} results
   */
  APPEND_SUPPLIER_SEARCH_RESULTS: results => ({
    results,
  }),
})

const INITIAL_STATE = {
  searchResult: [],
  searchLoading: loadingStatus.EMPTY,
}

const reducer = handleActions({
  [searchSuppliers]: (state, action) => ({
    ...state,
    searchLoading: loadingStatus.LOADING,
  }),
  [searchSuppliersSuccess]: (state, action) => ({
    ...state,
    searchLoading: loadingStatus.READY,
    searchResult: action.payload.searchResult,
  }),
  [searchSuppliersFailed]: (state, action) => ({
    ...state,
    searchLoading: loadingStatus.ERROR,
    errorMessage: action.payload.errorMessage,
  }),
  [appendSupplierSearchResults]: (state, action) => ({
    ...state,
    searchResult: state.searchResult.concat(
      action.payload.results
    ),
  }),
}, INITIAL_STATE)

export default reducer

export const getSupplierSearchResult = state => state.suppliers.searchResult

/**
 * Transform supplier search result
 *
 *  from:
 *    [{ name: 'bryan', id: 1  }, { name: 'achi', id: 2 }]
 *  to:
 *    ['bryan', 'achi']
 */
export const getSupplierDataSource = state => (
  // retrieve all suppliers search result.
  getSupplierSearchResult(state)
    .map(supplier => supplier.name)
)

/**
 * Get supplier id by matching
 *
 * @param {String} text
 * @returns {Integer} id
 */
export const getSupplierIdByName = (suppliers, text) => {
  const trimmedText = text.trim()

  const matchedSupplier = suppliers.find(
    supplier => supplier.name === trimmedText,
  )

  return (matchedSupplier && matchedSupplier.id) || null
}
