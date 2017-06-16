import { all, takeLatest, call, put } from 'redux-saga/effects'

import * as apis from '../apis/supply'
import * as actions from '../redux/supply'

export function * searchSupplyFlow (action) {
  const { supplierId, name } = action.payload

  try {
    const response = yield call(apis.searchSupply, supplierId, name)

    if (response.error) {
      throw new Error(response.error.message)
    }

    yield put(actions.searchSupplySuccess(response.data))
  } catch (error) {
    yield put(actions.searchSupplyFailed(error.errorMessage))
  }
}

export default function * supplyFlow () {
  yield all([
    takeLatest(actions.searchSupply().type, searchSupplyFlow),
  ])
}