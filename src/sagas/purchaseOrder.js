import { all, call, put, takeLatest } from 'redux-saga/effects'

import * as actions from '../redux/purchaseOrder'
import * as apis from '../apis/purchaseOrder'

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
    takeLatest(actions.createPurchaseOrder().type, createPurchaseOrderFlow),
  ])
}