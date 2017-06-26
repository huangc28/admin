import React, { Component, PropTypes } from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import { connect } from 'react-redux'

import PurchaseOrderList from '../../components/PurchaseOrderList'
import PurchaseOrder from '../../components/PurchaseOrder'
import {
  PURCHASE_ORDER_UNFULFILLED,
  PURCHASE_ORDER_FULFILLED,
  PER_PAGE,
} from '../../constants/purchaseOrderStatus'
import { fetchPurchaseOrders } from '../../redux/purchaseOrder'

/**
 * 1. product name
 * 2. thumbnail
 * 3. supplier
 * 4. assignee
 * 5. internal sku
 */
class PurchaseOrders extends Component {
  componentWillMount = () => {
    // fetch unfulfilled purchase orders
    this.props.fetchPurchaseOrders({
      page: 1,
      perpage: PER_PAGE,
      status: PURCHASE_ORDER_UNFULFILLED,
    })
  }

  render () {
    const {
      orders,
      fetchPurchaseOrders,
    } = this.props

    return (
      <div>
        {/* tabs */}
        <Tabs>
          <Tab
            value={PURCHASE_ORDER_UNFULFILLED}
            onActive={
              () => {
                // get unfulfilled purchase orders
                fetchPurchaseOrders({
                  page: 1,
                  perpage: PER_PAGE,
                  status: PURCHASE_ORDER_UNFULFILLED,
                })
              }
            }
            label="fulfilled"
          />
          <Tab
            value={PURCHASE_ORDER_FULFILLED}
            onActive={
              () => {
                // get unfulfilled purchase orders
                fetchPurchaseOrders({
                  page: 1,
                  perpage: PER_PAGE,
                  status: PURCHASE_ORDER_FULFILLED,
                })
              }
            }
            label="unfufilled"
          />
        </Tabs>

        <PurchaseOrderList>
          {
            orders.map((order, index) => {
              const {
                id,
                // @TODO this should be assignee user name
                assignee_user_id: assigneeUserId,
                supply: {
                  internal_sku: internalSku,
                  product_name: productName,
                },
              } = order

              return (
                <PurchaseOrder
                  key={index}
                  id={id}
                  name={productName}
                  assignee={assigneeUserId}
                  internalSku={internalSku}
                  image={''}
                />
              )
            })
          }
        </PurchaseOrderList>
      </div>
    )
  }
}

PurchaseOrders.propTypes = {
  fetchPurchaseOrders: PropTypes.func,
  orders: PropTypes.array,
}

const mapStateToProps = state => ({
  orders: state.purchaseOrder.data,
})

export default connect(mapStateToProps, {
  fetchPurchaseOrders,
})(PurchaseOrders)
