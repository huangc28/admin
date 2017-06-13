import { all, call, put, takeLatest } from 'redux-saga/effects'

import { storeInitFormData } from '../redux/initFormData'
import * as actions from '../redux/purchaseOrder'
import { appendSupplierSearchResults } from '../redux/supplier'
import { appendSupplySearchResults } from '../redux/supply'
import * as apis from '../apis/purchaseOrder'

export function * fetchPurchaseOrderFlow (action) {
  const { orderId } = action.payload

  try {
    const response = yield call(apis.fetchPurchaseOrder, orderId)

    if (response.error) {
      throw new Error(response.error.message)
    }

    yield put(actions.fetchPurchaseOrderSuccess(response.data))

    console.log('response data', response.data)

    // append fetch result to supplier search result
    yield put(appendSupplierSearchResults([
      response.data.supplier || {},
    ]))

    // append fetch result to supply search result
    yield put(appendSupplySearchResults([
      response.data.supply || {},
    ]))

    yield put(storeInitFormData(response.data))
  } catch (err) {
    console.log(err)
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

export function * editPurchaseOrderFlow (action) {
  // `po` stands for purchase order.
  const { po } = action.payload

  // console.log('po', po)

  try {
    // request api.
    const response = yield call(apis.editPurchaseOrder, po)

    // console.log('editPurchaseOrderFlow, response', response)

    if (response.error) {
      throw new Error(response.error)
    }

    yield put(actions.editPurchaseOrderSuccess(response.data))
  } catch (err) {
    // console.log('err', err)
    yield put(actions.editPurchaseOrderFailed(err.errorMessage))
  }
}

export default function * purchaseOrderFlow () {
  yield all([
    takeLatest(actions.fetchPurchaseOrder().type, fetchPurchaseOrderFlow),
    takeLatest(actions.fetchPurchaseOrders().type, fetchPurchaseOrdersFlow),
    takeLatest(actions.createPurchaseOrder().type, createPurchaseOrderFlow),
    takeLatest(actions.editPurchaseOrder().type, editPurchaseOrderFlow),
  ])
}