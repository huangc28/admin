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
  editPurchaseOrder,
  editPurchaseOrderSuccess,
  editPurchaseOrderFailed,
  fetchPurchaseOrder,
  fetchPurchaseOrderSuccess,
  fetchPurchaseOrderFailed,
  fetchPurchaseOrdersSuccess,
  fetchPurchaseOrdersFailed,
  fetchPurchaseOrders,
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
  EDIT_PURCHASE_ORDER: po => ({
    po,
  }),
  EDIT_PURCHASE_ORDER_SUCCESS: po => ({
    po,
  }),
  EDIT_PURCHASE_ORDER_FAILED: errorMessage => ({
    errorMessage,
  }),
  FETCH_PURCHASE_ORDER: orderId => ({
    orderId,
  }),
  FETCH_PURCHASE_ORDER_SUCCESS: order => ({
    order,
  }),
  FETCH_PURCHASE_ORDER_FAILED: errorMessage => ({
    errorMessage,
  }),
  FETCH_PURCHASE_ORDERS_SUCCESS: orders => ({
    orders,
  }),
  FETCH_PURCHASE_ORDERS_FAILED: errorMessage => ({
    errorMessage,
  }),
}, 'FETCH_PURCHASE_ORDERS')

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
  [editPurchaseOrder]: (state, action) => ({
    ...state,
    loading: loadingStatus.EMPTY,
  }),
  [editPurchaseOrderSuccess]: (state, action) => ({
    ...state,
    loading: loadingStatus.READY,
    data: [
      ...state.data.map(po => {
        if (po && po.id === action.payload.po) {
          return action.payload.po
        }

        return po
      }),
    ],
  }),
  [editPurchaseOrderFailed]: (state, action) => ({
    ...state,
    loading: loadingStatus.ERROR,
    errorMessage: action.payload.errorMessage,
  }),
  [fetchPurchaseOrder]: (state, action) => ({
    ...state,
    loading: loadingStatus.LOADING,
  }),
  [fetchPurchaseOrderSuccess]: (state, action) => ({
    ...state,
    loading: loadingStatus.READY,
    data: [
      ...state.data.filter(po => (
        po.id === action.payload.order.id
      )),
      action.payload.order,
    ],
  }),
  [fetchPurchaseOrderFailed]: (state, action) => ({
    ...state,
    loading: loadingStatus.ERROR,
    errorMessage: action.payload.errorMessage,
  }),
  [fetchPurchaseOrders]: (state, action) => ({
    ...state,
    loading: loadingStatus.LOADING,
  }),
  [fetchPurchaseOrdersSuccess]: (state, action) => ({
    ...state,
    loading: loadingStatus.READY,
    data: action.payload.orders,
  }),
  [fetchPurchaseOrdersFailed]: (state, action) => ({
    ...state,
    loading: loadingStatus.ERROR,
    errorMessage: action.payload.errorMessage,
  }),
}, INITIAL_STATE)

export default reducer
