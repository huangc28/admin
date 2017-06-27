import {
  createActions,
  handleActions,
} from 'redux-actions'

import * as loadingStatus from '../constants/loadingState'

export const CREATE_PURCHASE_ORDER = 'CREATE_PURCHASE_ORDER'
export const CREATE_PURCHASE_ORDER_SUCCESS = 'CREATE_PURCHASE_ORDER_SUCCESS'
export const CREATE_PURCHASE_ORDER_FAILED = 'CREATE_PURCHASE_ORDER_FAILED'

export const EDIT_PURCHASE_ORDER = 'EDIT_PURCHASE_ORDER'
export const EDIT_PURCHASE_ORDER_SUCCESS = 'EDIT_PURCHASE_ORDER_SUCCESS'
export const EDIT_PURCHASE_ORDER_FAILED = 'EDIT_PURCHASE_ORDER_FAILED'

export const FETCH_PURCHASE_ORDER = 'FETCH_PURCHASE_ORDER'
export const FETCH_PURCHASE_ORDER_SUCCESS = 'FETCH_PURCHASE_ORDER_SUCCESS'
export const FETCH_PURCHASE_ORDER_FAILED = 'FETCH_PURCHASE_ORDER_FAILED'

export const FETCH_PURCHASE_ORDERS = 'FETCH_PURCHASE_ORDERS'
export const FETCH_PURCHASE_ORDERS_SUCCESS = 'FETCH_PURCHASE_ORDERS_SUCCESS'
export const FETCH_PURCHASE_ORDERS_FAILED = 'FETCH_PURCHASE_ORDERS_FAILED'

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
  [CREATE_PURCHASE_ORDER]: po => ({
    po,
  }),
  [CREATE_PURCHASE_ORDER_SUCCESS]: po => ({
    po,
  }),
  [CREATE_PURCHASE_ORDER_FAILED]: errorMessage => ({
    errorMessage,
  }),
  [EDIT_PURCHASE_ORDER]: po => ({
    po,
  }),
  [EDIT_PURCHASE_ORDER_SUCCESS]: po => ({
    po,
  }),
  [EDIT_PURCHASE_ORDER_FAILED]: errorMessage => ({
    errorMessage,
  }),
  [FETCH_PURCHASE_ORDER]: orderId => ({
    orderId,
  }),
  [FETCH_PURCHASE_ORDER_SUCCESS]: order => ({
    order,
  }),
  [FETCH_PURCHASE_ORDER_FAILED]: errorMessage => ({
    errorMessage,
  }),
  [FETCH_PURCHASE_ORDERS_SUCCESS]: ({ data, total }) => ({
    data,
    total,
  }),
  [FETCH_PURCHASE_ORDERS_FAILED]: errorMessage => ({
    errorMessage,
  }),
  [FETCH_PURCHASE_ORDERS]: ({ page, perpage, status }) => ({
    page,
    perpage,
    status,
  }),
})

// Reducer
const INITIAL_STATE = {
  data: [],
  total: 0,
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
  [fetchPurchaseOrdersSuccess]: (state, action) => {
    const {
      data,
      total,
    } = action.payload

    return {
      ...state,
      loading: loadingStatus.READY,
      data,
      total,
    }
  },
  [fetchPurchaseOrdersFailed]: (state, action) => ({
    ...state,
    loading: loadingStatus.ERROR,
    errorMessage: action.payload.errorMessage,
  }),
}, INITIAL_STATE)

export default reducer
