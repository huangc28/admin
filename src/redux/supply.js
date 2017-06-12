import {
  createActions,
  handleActions,
} from 'redux-actions'

import * as loadingStatus from '../constants/loadingState'

export const {
  searchSupply,
  searchSupplySuccess,
  searchSupplyFailed,
} = createActions({
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
}, INITIAL_STATE)

export default reducer

export const getSupplySearchResult = state => state.supply.searchResult

export const getSupplyDataSource = state => (
  // retrieve all suppliers search result.
  getSupplySearchResult(state)
    .map(supply => supply.product_name)
)
