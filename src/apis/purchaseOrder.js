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

