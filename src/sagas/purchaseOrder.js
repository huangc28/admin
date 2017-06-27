import { all, call, put, takeLatest } from 'redux-saga/effects'

import { storeInitFormData } from '../redux/initFormData'
import * as actions from '../redux/purchaseOrder'
import { appendSupplierSearchResults } from '../redux/supplier'
import { appendSupplySearchResults } from '../redux/supply'
import * as apis from '../apis/purchaseOrder'

// normalize purchase order data.
/**
 * @issue https://github.com/twisty/formsy-react-components/issues/66
 *
 * Normalize empty attributes in purchase order object to string instead of null
 *
 * For example:
 *
 * {
 *  name: null
 * }
 *
 * to:
 *
 * {
 *  name: '',
 * }
 *
 * The reason for that is to prevent warning from react, check the github issue above.
 *
 * Normalize the following fields:
 *
 *    approverUserId: '',
 *    supplier: {
 *      name: '',
 *      id: '',
 *    },
 *    supply: {
 *      product_name: '',
 *      id: '',
 *    },
 *    quantity: '',
 *    price: '',
 *    shippingCost: '',
 *    shippingCarrier: '',
 *    trackingNumber: '',
 *    transactionNumber: '',
 *
 * @param {Object} purchaseOrder
 */
export const normalizePurchaseOrderEmptyValue = purchaseOrder => {
  const normalizedPurchaseOrder = purchaseOrder

  // fields of the initial value that needs to be normalized.
  const fieldList = [
    'approver_user_id',
    'quantity',
    'price',
    'supply',
    'supplier',
    'shipping_cost',
    'shipping_carrier',
    'tracking_number',
    'transaction_number',
  ]

  fieldList.forEach(field => {
    if (field === 'supply' || field === 'supplier' || field === 'approver') {
      Object.keys(purchaseOrder[field]).forEach(attr => {
        if (purchaseOrder[field][attr] === null) {
          normalizedPurchaseOrder[field][attr] = ''
        }
      })
    }

    // makesure field in the list exists and the value is null
    if (purchaseOrder[field] === null) {
      normalizedPurchaseOrder[field] = ''
    }
  })

  return normalizedPurchaseOrder
}

export function * fetchPurchaseOrderFlow (action) {
  const { orderId } = action.payload

  try {
    const response = yield call(apis.fetchPurchaseOrder, orderId)

    if (response.error) {
      throw new Error(response.error.message)
    }

    yield put(actions.fetchPurchaseOrderSuccess(response.data))

    // append fetch result to supplier search result
    yield put(appendSupplierSearchResults([
      response.data.supplier || {},
    ]))

    // append fetch result to supply search result
    yield put(appendSupplySearchResults([
      response.data.supply || {},
    ]))

    yield put(storeInitFormData(
      normalizePurchaseOrderEmptyValue(response.data)
    ))
  } catch (err) {
    yield put(actions.fetchPurchaseOrderFailed(err.errorMessage))
  }
}

export function * fetchPurchaseOrdersFlow (action) {
  const {
    page,
    perpage,
    status,
  } = action.payload

  try {
    const response = yield call(apis.fetchPurchaseOrders, {
      page,
      perpage,
      status,
    })

    if (response.error) {
      throw new Error(response.error)
    }

    const {
      data,
      total,
    } = response

    yield put(actions.fetchPurchaseOrdersSuccess({
      data,
      total,
    }))
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

  try {
    // request api.
    const response = yield call(apis.editPurchaseOrder, po)

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
    takeLatest(actions.FETCH_PURCHASE_ORDER, fetchPurchaseOrderFlow),
    takeLatest(actions.FETCH_PURCHASE_ORDERS, fetchPurchaseOrdersFlow),
    takeLatest(actions.CREATE_PURCHASE_ORDER, createPurchaseOrderFlow),
    takeLatest(actions.EDIT_PURCHASE_ORDER, editPurchaseOrderFlow),
  ])
}