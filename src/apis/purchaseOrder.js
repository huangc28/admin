import { buildApiUrl, fetchApi } from './utils'

/**
 * @param {Object} po
 * @returns {Promise}
 */
export const createPurchaseOrder = po => (
  fetchApi(buildApiUrl('purchaseOrders'), 'POST', {
    'Content-Type': 'application/json',
  }, {
    body: JSON.stringify(po),
  })
  .then(res => res.json())
)

export const editPurchaseOrder = po => (
  fetchApi(buildApiUrl(`purchaseOrders/${po.id}`), 'PUT', {
    'Content-Type': 'application/json',
  }, {
    body: JSON.stringify(po),
  })
  .then(res => res.json())
)

/**
 * @param {Number} page
 * @param {Number} perpage
 * @param {Number} status
 */
export const fetchPurchaseOrders = ({ page, perpage, status }) => (
  fetchApi(buildApiUrl(`purchaseOrders?page=${page}&perpage=${perpage}&status=${status}`))
  .then(res => res.json())
)

export const fetchPurchaseOrder = orderId => (
  fetchApi(buildApiUrl(`purchaseOrders/${orderId}`))
  .then(res => res.json())
)
