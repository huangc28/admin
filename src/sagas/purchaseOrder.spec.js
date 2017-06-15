/* eslint-disable */
import { normalizePurchaseOrderEmptyValue } from './purchaseOrder'
const testPurchaseOrder = {
  id: 3,
  idea_sample_id: 1,
  approver_user_id: 1,
  assignee_user_id: 2,
  supplier_id: 1,
  supply_id: 2,
  package_unit: "套（4个一套)",
  price: "2.5",
  quantity: 200,
  supplier_order_number: "2017060600000001",
  transaction_number: null,
  shipping_carrier: null,
  tracking_number: null,
  shipping_cost: "300",
  step: 0,
  status: 1,
  deleted_at: null,
  created_at: "2017-06-12 09:33:53",
  updated_at: "2017-06-15 02:05:50",
  supplier: {
    id: null,
    name: null
  },
  supply: {
    id: null,
    product_name: null
  }
}

describe('normalize purchase order empty value', () => {
  test('convert null value to empty string', () => {
    const normalizedObj = normalizePurchaseOrderEmptyValue(testPurchaseOrder)

    // assert specified value is initialized to empty string
    expect(normalizedObj.transaction_number).toBe('')
    expect(normalizedObj.shipping_carrier).toBe('')
    expect(normalizedObj.tracking_number).toBe('')

    expect(normalizedObj.supplier.id).toBe('')
    expect(normalizedObj.supplier.name).toBe('')
    expect(normalizedObj.supply.id).toBe('')
    expect(normalizedObj.supply.product_name).toBe('')
  })
})