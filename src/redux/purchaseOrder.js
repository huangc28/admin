import {
  createActions,
  handleActions,
} from 'redux-actions'

import * as loadingStatus from '../constants/loadingState'

// Action Creators

/**
 * PO - stands for purchase order.
 *
 * redux-actions `actions creator` naming convention.
 *
 *   two consecutive capitalized letter is not allowed:
 *
 *     `createPO` ---> will give undefined
 *
 *   name it like:
 *
 *     `createPurchaseOrder`
 */
export const {
  createPurchaseOrder,
  createPurchaseOrderSuccess,
  createPurchaseOrderFailed,
} = createActions({
  CREATE_PURCHASE_ORDER: po => ({
    po,
  }),
  CREATE_PURCHASE_ORDER_SUCCESS: po => ({
    po,
  }),
  CREATE_PURCHASE_ORDER_FAILED: errorMessage => ({
    errorMessage,
  }),
})

// Reducer

const INITIAL_STATE = {
  data: [],
  errorMessage: null,
  loading: loadingStatus.EMPTY,
}

const reducer = handleActions({
  [createPurchaseOrder]: (state, action) => ({
    ...state,
    errorMessage: loadingStatus.LOADING,
  }),
  [createPurchaseOrderSuccess]: (state, action) => ({ // @TODO should filter duplicated purchase order.
    ...state,
    loading: loadingStatus.READY,
    data: [
      action.payload.po,
      ...state.data,
    ],
  }),
  [createPurchaseOrderFailed]: (state, action) => ({
    ...state,
    loading: loadingStatus.ERROR,
    errorMessage: action.payload.errorMessage,
  }),
}, INITIAL_STATE)

export default reducer
