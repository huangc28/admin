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
  createSupplier,
  createSupplierSuccess,
  createSupplierFailed,
  searchSuppliers,
  searchSuppliersSuccess,
  searchSuppliersFailed,
  appendSupplierSearchResults,
} = createActions({
  CREATE_SUPPLIER: data => ({
    data,
  }),
  CREATE_SUPPLIER_SUCCESS: data => ({
    data,
  }),
  CREATE_SUPPLIER_FAILED: errorMessage => ({
    errorMessage,
  }),
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
  data: [],
  searchLoading: loadingStatus.EMPTY,
  loading: loadingStatus.EMPTY,
  errorMessage: null,
}

const reducer = handleActions({
  [createSupplier]: (state, action) => ({
    ...state,
    loading: loadingStatus.LOADING,
  }),
  [createSupplierSuccess]: (state, action) => ({
    ...state,
    loading: loadingStatus.READY,
    data: state.data.concat(action.payload.data),
  }),
  [createSupplierFailed]: (state, action) => ({
    ...state,
    loading: loadingStatus.ERROR,
    errorMessage: action.payload.errorMessage,
  }),
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
 * Get supplier data by name
 *
 * @param {Array} suppliers
 * @param {String} text
 * @param {Object} || null
 */
export const getSupplierByName = (suppliers, text) => {
  const trimmedText = text.trim()

  const matchedSupplier = suppliers.find(
    supplier => supplier.name === trimmedText,
  )

  return matchedSupplier || null
}
