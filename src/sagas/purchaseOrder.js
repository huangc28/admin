import { all, call, put, takeLatest } from 'redux-saga/effects'

import { storeInitFormData } from '../redux/initFormData'
import * as actions from '../redux/purchaseOrder'
import * as apis from '../apis/purchaseOrder'

export function * fetchPurchaseOrderFlow (action) {
  const { orderId } = action.payload

  try {
    const response = yield call(apis.fetchPurchaseOrder, orderId)

    if (response.error) {
      throw new Error(response.error.message)
    }

    yield put(actions.fetchPurchaseOrderSuccess(response.data))

    yield put(storeInitFormData(response.data))
  } catch (err) {
    yield put(actions.fetchPurchaseOrderFailed(err.errorMessage))
  }
}

export function * fetchPurchaseOrdersFlow (action) {
  try {
    const response = yield call(apis.fetchPurchaseOrders)

    if (response.error) {
      throw new Error(response.error)
    }

    yield put(actions.fetchPurchaseOrdersSuccess(response.data))
  } catch (err) {
    yield put(actions.fetchPurchaseOrdersFailed(err.errorMessage))
  }
}

export function * createPurchaseOrderFlow (action) {
  // `po` stands for purchase order.
  const { po } = action.payload

  try {
    // request api.
    const response = yield call(apis.createPurchaseOrder, po)

    if (response.error) {
      throw new Error(response.error)
    }

    yield put(actions.createPurchaseOrderSuccess(response.data))
  } catch (err) {
    yield put(actions.createPurchaseOrderFailed(err.errorMessage))
  }
}

export default function * purchaseOrderFlow () {
  yield all([
    takeLatest(actions.fetchPurchaseOrder().type, fetchPurchaseOrderFlow),
    takeLatest(actions.fetchPurchaseOrders().type, fetchPurchaseOrdersFlow),
    takeLatest(actions.createPurchaseOrder().type, createPurchaseOrderFlow),
  ])
}