import React, { Component, PropTypes } from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import { connect } from 'react-redux'

import styles from './PurchaseOrders.css'
import PurchaseOrderList from '../../components/PurchaseOrderList'
import PurchaseOrder from '../../components/PurchaseOrder'
import Paginate from '../../components/Paginate'
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
  state = {
    poStatus: PURCHASE_ORDER_UNFULFILLED,
  }

  componentWillMount = () => {
    // fetch unfulfilled purchase orders
    this.props.fetchPurchaseOrders({
      page: 1,
      perpage: PER_PAGE,
      status: this.state.poStatus,
    })
  }

  onPageChange = selected => {
    const { fetchPurchaseOrders } = this.props

    fetchPurchaseOrders({
      page: selected + 1,
      perpage: PER_PAGE,
      status: this.state.poStatus,
    })
  }

  onActivePOUnfulfilled = () => {
    const { fetchPurchaseOrders } = this.props

    // get unfulfilled purchase orders
    fetchPurchaseOrders({
      page: 1,
      perpage: PER_PAGE,
      status: PURCHASE_ORDER_UNFULFILLED,
    })

    this.setState({
      poStatus: PURCHASE_ORDER_UNFULFILLED,
    })
  }

  onActivePOFulfilled = () => {
    const { fetchPurchaseOrders } = this.props

    // get unfulfilled purchase orders
    fetchPurchaseOrders({
      page: 1,
      perpage: PER_PAGE,
      status: PURCHASE_ORDER_FULFILLED,
    })

    this.setState({
      poStatus: PURCHASE_ORDER_FULFILLED,
    })
  }

  render () {
    const {
      pageCount,
      orders,
    } = this.props

    return (
      <div>
        {/* tabs */}
        <Tabs>
          <Tab
            value={PURCHASE_ORDER_UNFULFILLED}
            onActive={this.onActivePOUnfulfilled}
            label="Unfulfilled"
          />
          <Tab
            value={PURCHASE_ORDER_FULFILLED}
            onActive={this.onActivePOFulfilled}
            label="Fufilled"
          />
        </Tabs>

        <PurchaseOrderList>
          {
            orders.length && orders.map((order, index) => {
              const {
                id,
                // @TODO this should be assignee user name
                assignee: {
                  username,
                } = {},
                supply: {
                  internal_sku: internalSku,
                  product_name: productName,
                  image,
                } = {},
              } = order

              return (
                <PurchaseOrder
                  key={index}
                  id={id}
                  name={productName}
                  assignee={username}
                  internalSku={internalSku}
                  image={image}
                />
              )
            })
          }
        </PurchaseOrderList>

        {/* pagination */}
        <div className={styles.paginationContainer}>
          <Paginate
            pageCount={pageCount}
            onPageChange={this.onPageChange}
          />
        </div>
      </div>
    )
  }
}

PurchaseOrders.propTypes = {
  fetchPurchaseOrders: PropTypes.func,
  orders: PropTypes.array,
  pageCount: PropTypes.number,
}

const mapStateToProps = state => {
  const { total } = state.purchaseOrder

  return {
    orders: state.purchaseOrder.data,
    pageCount: Math.ceil(total / PER_PAGE),
  }
}

export default connect(mapStateToProps, {
  fetchPurchaseOrders,
})(PurchaseOrders)
