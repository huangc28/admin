import { all, takeLatest, call, put } from 'redux-saga/effects'

import * as apis from '../apis/suppliers'
import * as actions from '../redux/supplier'

export function * searchSuppliersFlow (action) {
  const { name } = action.payload

  try {
    const response = yield call(apis.searchSuppliers, name)

    if (response.error) {
      throw new Error(response.error.message)
    }

    yield put(actions.searchSuppliersSuccess(response.data))
  } catch (err) {
    yield put(actions.searchSuppliersFailed(err.message))
  }
}

export default function * suppliersFlow () {
  yield all([
    takeLatest(actions.searchSuppliers().type, searchSuppliersFlow),
  ])
}