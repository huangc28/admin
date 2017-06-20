import { all, takeLatest, call, put } from 'redux-saga/effects'

import * as apis from '../apis/suppliers'
import * as actions from '../redux/supplier'

export function * createSupplier (action) {
  const { data } = action.payload

  try {
    const response = yield call(apis.createSupplier, data)

    if (response.error) {
      throw new Error(response.error.message)
    }

    yield put(actions.createSupplierSuccess(response.data))
  } catch (err) {
    yield put(actions.createSupplierFailed(err.message))
  }
}

export function * searchSuppliers (action) {
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
    takeLatest(actions.searchSuppliers().type, searchSuppliers),
    takeLatest(actions.createSupplier().type, createSupplier),
  ])
}